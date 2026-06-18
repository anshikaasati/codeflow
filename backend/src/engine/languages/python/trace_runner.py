import sys
import io
import json
import traceback

class TraceRunner:
    def __init__(self, code_path, input_str):
        self.code_path = code_path
        self.input_str = input_str
        self.steps = []
        self.output_buffer = io.StringIO()
        self.heap = {}
        self.obj_to_addr = {}
        self.addr_counter = 1000

        # Read the user code
        with open(code_path, 'r', encoding='utf-8') as f:
            self.code = f.read()

    def get_address(self, obj):
        obj_id = id(obj)
        if obj_id not in self.obj_to_addr:
            self.obj_to_addr[obj_id] = f"#{self.addr_counter}"
            self.addr_counter += 1
        return self.obj_to_addr[obj_id]

    def serialize_value(self, val, step_heap):
        if val is None:
            return None
        if isinstance(val, float):
            import math
            if math.isinf(val):
                return "Infinity" if val > 0 else "-Infinity"
            if math.isnan(val):
                return "NaN"
            return val
        if isinstance(val, (int, str, bool)):
            return val
        
        # Avoid circular references by checking step_heap first
        addr = self.get_address(val)
        if addr in step_heap:
            return addr

        if isinstance(val, list):
            # Place list in step_heap
            step_heap[addr] = [] # Placeholder to prevent infinite recursion
            step_heap[addr] = [self.serialize_value(x, step_heap) for x in val]
            return addr
        elif isinstance(val, dict):
            step_heap[addr] = {}
            step_heap[addr] = {str(k): self.serialize_value(v, step_heap) for k, v in val.items()}
            return addr
        elif isinstance(val, set):
            step_heap[addr] = []
            step_heap[addr] = [self.serialize_value(x, step_heap) for x in val]
            return addr
        elif isinstance(val, tuple):
            step_heap[addr] = []
            step_heap[addr] = [self.serialize_value(x, step_heap) for x in val]
            return addr
        elif hasattr(val, '__dict__'):
            # Custom class instance (e.g. ListNode or TreeNode)
            step_heap[addr] = {}
            fields = {}
            # Prevent infinitely serializing internal methods/properties
            for k, v in val.__dict__.items():
                if not k.startswith('_'):
                    fields[k] = self.serialize_value(v, step_heap)
            step_heap[addr] = fields
            return addr
        else:
            return str(val)

    def run(self):
        # Redirect stdout and stdin
        old_stdout = sys.stdout
        sys.stdout = self.output_buffer
        old_stdin = sys.stdin
        sys.stdin = io.StringIO(self.input_str)

        compiled = None
        try:
            compiled = compile(self.code, '<user_code>', 'exec')
        except SyntaxError as e:
            # Restore streams
            sys.stdout = old_stdout
            sys.stdin = old_stdin
            print(json.dumps({
                "success": False,
                "error": {
                    "type": "syntax",
                    "message": e.msg,
                    "line": e.lineno,
                    "offset": e.offset,
                    "text": e.text
                }
            }))
            return

        globals_dict = {
            "__name__": "__main__",
            "__builtins__": __builtins__
        }
        locals_dict = globals_dict

        last_output_len = 0

        def trace_func(frame, event, arg):
            nonlocal last_output_len
            # Only trace code executing inside the compiled user code
            if frame.f_code.co_filename != '<user_code>':
                return trace_func

            # Get current line
            line = frame.f_lineno

            # Capture stdout
            current_output = self.output_buffer.getvalue()
            new_output = current_output[last_output_len:]
            last_output_len = len(current_output)

            # Build call stack frames
            call_stack = []
            curr_frame = frame
            while curr_frame:
                if curr_frame.f_code.co_filename == '<user_code>':
                    # Only collect locals that don't start with __ and are user-defined
                    clean_locals = {}
                    for k, v in curr_frame.f_locals.items():
                        if not k.startswith('__') and k != 'Solution' and not hasattr(v, '__call__') and not isinstance(v, type):
                            clean_locals[k] = v
                    
                    func_name = curr_frame.f_code.co_name
                    if func_name == '<module>':
                        func_name = 'main'
                        
                    call_stack.append({
                        "function": func_name,
                        "locals": clean_locals
                    })
                curr_frame = curr_frame.f_back
            
            # Reverse call_stack to match bottom-to-top frame list
            call_stack.reverse()

            # Serialize the call stack frames and construct the step heap
            step_heap = {}
            serial_stack = []
            for frame_data in call_stack:
                serial_locals = {}
                for k, v in frame_data["locals"].items():
                    serial_locals[k] = self.serialize_value(v, step_heap)
                serial_stack.append({
                    "function": frame_data["function"],
                    "locals": serial_locals
                })

            exception_info = None
            if event == 'exception' and arg:
                exc_type, exc_val, exc_tb = arg
                exception_info = {
                    "type": exc_type.__name__,
                    "message": str(exc_val)
                }

            # Map line content
            code_lines = self.code.split('\n')
            line_content = code_lines[line - 1].strip() if 0 < line <= len(code_lines) else ""

            # Check if this is a dummy setup line, skip if it's main driver instantiation
            if 'if __name__' in line_content or 'sol = Solution()' in line_content:
                # Let's still record it or trace it, but keep it clean
                pass

            step_data = {
                "line": line,
                "type": "assignment" if event in ('line', 'call') else ("return" if event == 'return' else "error"),
                "stack": serial_stack,
                "heap": step_heap,
                "output": current_output,
                "event": event
            }
            if exception_info:
                step_data["exception"] = exception_info
                step_data["type"] = "error"

            self.steps.append(step_data)
            return trace_func

        try:
            sys.settrace(trace_func)
            exec(compiled, globals_dict, locals_dict)
        except Exception as e:
            # Capture final exception frame if not already added
            exc_type, exc_val, exc_tb = sys.exc_info()
            # Find the line in the user code where exception happened
            tb = exc_tb
            err_line = 1
            while tb:
                if tb.tb_frame.f_code.co_filename == '<user_code>':
                    err_line = tb.tb_lineno
                tb = tb.tb_next
                
            self.steps.append({
                "line": err_line,
                "type": "error",
                "stack": [],
                "heap": {},
                "output": self.output_buffer.getvalue(),
                "event": "exception",
                "exception": {
                    "type": exc_type.__name__,
                    "message": str(exc_val)
                }
            })
        finally:
            sys.settrace(None)
            sys.stdout = old_stdout
            sys.stdin = old_stdin

        # Filter duplicates or clean up steps if necessary (e.g. consecutive identical lines)
        # Output trace results to stdout
        print(json.dumps({
            "success": True,
            "steps": self.steps,
            "output": self.output_buffer.getvalue()
        }))

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"success": False, "error": {"type": "syntax", "message": "No code file specified"}}))
        sys.exit(1)
        
    code_file = sys.argv[1]
    user_input = sys.argv[2] if len(sys.argv) > 2 else ""
    
    runner = TraceRunner(code_file, user_input)
    runner.run()
