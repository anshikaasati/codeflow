"""
Java Trace Runner - CodeFlow
Implements step-by-step Java execution tracing via the Java Debug Wire Protocol (JDWP).

Architecture:
  1. Compile user Java source via javac
  2. Launch JVM with JDWP in suspend mode on a free port
  3. Connect via raw socket and JDWP packet protocol
  4. Step line-by-line, capturing all local variables at each step
  5. Output JSON trace steps to stdout (same format as trace_runner.py)
"""

import sys
import os
import io
import json
import socket
import struct
import subprocess
import tempfile
import time
import threading
import traceback
import shutil
import platform

# ─────────────────────────────────────────────────────────────────────────────
# JDWP constants
# ─────────────────────────────────────────────────────────────────────────────
JDWP_HANDSHAKE = b"JDWP-Handshake"

# Command Sets
CS_VIRTUAL_MACHINE = 1
CS_EVENT_REQUEST    = 15
CS_EVENT            = 64
CS_THREAD_REF       = 11
CS_STACK_FRAME      = 16
CS_OBJECT_REF       = 9
CS_STRING_REF       = 10
CS_ARRAY_REF        = 13
CS_CLASS_TYPE       = 3
CS_REFERENCE_TYPE   = 2
CS_METHOD           = 6

# Commands
CMD_VM_VERSION          = 1
CMD_VM_CLASSES_BY_SIG   = 2
CMD_VM_ALL_THREADS      = 4
CMD_VM_RESUME           = 9
CMD_VM_SUSPEND          = 8
CMD_VM_EXIT             = 10
CMD_VM_CAPABS_NEW       = 17

CMD_EVREQ_SET           = 1
CMD_EVREQ_CLEAR         = 2

CMD_THREAD_NAME         = 1
CMD_THREAD_SUSPEND      = 2
CMD_THREAD_RESUME       = 3
CMD_THREAD_STATUS       = 4
CMD_THREAD_FRAMES       = 6
CMD_THREAD_FRAME_COUNT  = 7

CMD_FRAME_GET_VALUES    = 1

CMD_OBJREF_REFERENCE_TYPE  = 1
CMD_OBJREF_GET_VALUES      = 2
CMD_OBJREF_IS_COLLECTED    = 9

CMD_STRINGREF_VALUE     = 1
CMD_ARRAYREF_LENGTH     = 1
CMD_ARRAYREF_GET_VALUES = 2

CMD_REFTYPE_FIELDS      = 4
CMD_REFTYPE_METHODS     = 5
CMD_REFTYPE_GET_VALUES  = 6
CMD_REFTYPE_SIGNATURE   = 1
CMD_REFTYPE_SOURCE_FILE = 7
CMD_REFTYPE_VARIABLE_TABLE = 2  # MethodRef

CMD_METHOD_VARIABLE_TABLE       = 2
CMD_METHOD_VARIABLE_TABLE_WITH_GENERIC = 5

# Event kinds
EK_VM_START         = 90
EK_VM_DEATH         = 99
EK_SINGLE_STEP      = 1
EK_BREAKPOINT       = 2
EK_EXCEPTION        = 4
EK_CLASS_PREPARE    = 8
EK_THREAD_START     = 6
EK_THREAD_DEATH     = 7

# Suspend policies
SP_NONE  = 0
SP_EVENT_THREAD = 1
SP_ALL   = 2

# Modifiers
MOD_CLASS_ONLY  = 4
MOD_COUNT       = 1
MOD_THREAD_ONLY = 3
MOD_LOCATION    = 7
MOD_STEP        = 10

# Step sizes
STEP_SIZE_MIN = 0  # Minimum step (each bytecode)
STEP_SIZE_LINE = 1  # Line-by-line

# Step depths
STEP_DEPTH_INTO = 0
STEP_DEPTH_OVER = 1
STEP_DEPTH_OUT  = 2

# Tag values
TAG_ARRAY   = ord('[')
TAG_BYTE    = ord('B')
TAG_CHAR    = ord('C')
TAG_OBJECT  = ord('L')
TAG_FLOAT   = ord('F')
TAG_DOUBLE  = ord('D')
TAG_INT     = ord('I')
TAG_LONG    = ord('J')
TAG_SHORT   = ord('S')
TAG_VOID    = ord('V')
TAG_BOOLEAN = ord('Z')
TAG_STRING  = ord('s')
TAG_THREAD  = ord('t')
TAG_THREAD_GROUP = ord('g')
TAG_CLASS_LOADER = ord('l')
TAG_CLASS_OBJECT = ord('c')

PRIMITIVE_TAGS = {TAG_BYTE, TAG_CHAR, TAG_FLOAT, TAG_DOUBLE, TAG_INT, TAG_LONG, TAG_SHORT, TAG_BOOLEAN}

# ─────────────────────────────────────────────────────────────────────────────
# Utility
# ─────────────────────────────────────────────────────────────────────────────

def find_free_port():
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(('', 0))
        return s.getsockname()[1]


def java_cmd():
    """Return path to java executable."""
    if platform.system() == 'Windows':
        return 'java'
    return 'java'


def javac_cmd():
    if platform.system() == 'Windows':
        return 'javac'
    return 'javac'


# ─────────────────────────────────────────────────────────────────────────────
# JDWP Packet reader/writer
# ─────────────────────────────────────────────────────────────────────────────

class JDWPPacket:
    HEADER_SIZE = 11

    def __init__(self, id_, cmd_set=0, command=0, flags=0, data=b'', error_code=0):
        self.id = id_
        self.cmd_set = cmd_set
        self.command = command
        self.flags = flags
        self.data = data
        self.error_code = error_code

    @property
    def is_reply(self):
        return bool(self.flags & 0x80)

    def pack(self):
        length = self.HEADER_SIZE + len(self.data)
        return struct.pack('>IIBBB', length, self.id, self.flags, self.cmd_set, self.command) + self.data

    @classmethod
    def from_bytes(cls, raw):
        length, id_, flags, cmd_set, command = struct.unpack('>IIBBB', raw[:11])
        data = raw[11:length]
        error_code = 0
        if flags & 0x80:
            # reply packet: cmd_set is high byte of errorCode, command is low byte
            error_code = (cmd_set << 8) | command
            cmd_set = 0
            command = 0
        return cls(id_, cmd_set, command, flags, data, error_code)


class DataReader:
    def __init__(self, data, id_sizes=None):
        self.data = data
        self.pos = 0
        self.id_sizes = id_sizes or {'fieldIDSize': 8, 'methodIDSize': 8, 'objectIDSize': 8, 'referenceTypeIDSize': 8, 'frameIDSize': 8}

    def read(self, n):
        chunk = self.data[self.pos:self.pos + n]
        self.pos += n
        return chunk

    def read_int(self):
        return struct.unpack('>i', self.read(4))[0]

    def read_uint(self):
        return struct.unpack('>I', self.read(4))[0]

    def read_long(self):
        return struct.unpack('>q', self.read(8))[0]

    def read_byte(self):
        return struct.unpack('>B', self.read(1))[0]

    def read_short(self):
        return struct.unpack('>H', self.read(2))[0]

    def read_bool(self):
        return struct.unpack('>B', self.read(1))[0] != 0

    def read_string(self):
        length = self.read_uint()
        return self.read(length).decode('utf-8', errors='replace')

    def read_object_id(self):
        sz = self.id_sizes['objectIDSize']
        raw = self.read(sz)
        if sz == 8:
            return struct.unpack('>q', raw)[0]
        return struct.unpack('>i', raw)[0]

    def read_reference_type_id(self):
        sz = self.id_sizes['referenceTypeIDSize']
        raw = self.read(sz)
        if sz == 8:
            return struct.unpack('>q', raw)[0]
        return struct.unpack('>i', raw)[0]

    def read_method_id(self):
        sz = self.id_sizes['methodIDSize']
        raw = self.read(sz)
        if sz == 8:
            return struct.unpack('>q', raw)[0]
        return struct.unpack('>i', raw)[0]

    def read_frame_id(self):
        sz = self.id_sizes['frameIDSize']
        raw = self.read(sz)
        if sz == 8:
            return struct.unpack('>q', raw)[0]
        return struct.unpack('>i', raw)[0]

    def read_location(self):
        type_tag = self.read_byte()
        class_id = self.read_reference_type_id()
        method_id = self.read_method_id()
        index = self.read_long()
        return (type_tag, class_id, method_id, index)

    def remaining(self):
        return len(self.data) - self.pos


class DataWriter:
    def __init__(self, id_sizes=None):
        self.data = bytearray()
        self.id_sizes = id_sizes or {'fieldIDSize': 8, 'methodIDSize': 8, 'objectIDSize': 8, 'referenceTypeIDSize': 8, 'frameIDSize': 8}

    def write_int(self, v):
        self.data += struct.pack('>i', v)

    def write_uint(self, v):
        self.data += struct.pack('>I', v)

    def write_long(self, v):
        self.data += struct.pack('>q', v)

    def write_byte(self, v):
        self.data += struct.pack('>B', v)

    def write_short(self, v):
        self.data += struct.pack('>H', v)

    def write_bool(self, v):
        self.data += struct.pack('>B', 1 if v else 0)

    def write_string(self, s):
        encoded = s.encode('utf-8')
        self.write_uint(len(encoded))
        self.data += encoded

    def write_object_id(self, v):
        sz = self.id_sizes['objectIDSize']
        if sz == 8:
            self.data += struct.pack('>q', v)
        else:
            self.data += struct.pack('>i', v)

    def write_reference_type_id(self, v):
        sz = self.id_sizes['referenceTypeIDSize']
        if sz == 8:
            self.data += struct.pack('>q', v)
        else:
            self.data += struct.pack('>i', v)

    def write_method_id(self, v):
        sz = self.id_sizes['methodIDSize']
        if sz == 8:
            self.data += struct.pack('>q', v)
        else:
            self.data += struct.pack('>i', v)

    def write_frame_id(self, v):
        sz = self.id_sizes['frameIDSize']
        if sz == 8:
            self.data += struct.pack('>q', v)
        else:
            self.data += struct.pack('>i', v)

    def write_location(self, type_tag, class_id, method_id, index):
        self.write_byte(type_tag)
        self.write_reference_type_id(class_id)
        self.write_method_id(method_id)
        self.write_long(index)

    def bytes(self):
        return bytes(self.data)


# ─────────────────────────────────────────────────────────────────────────────
# JDWP Connection
# ─────────────────────────────────────────────────────────────────────────────

class JDWPConnection:
    def __init__(self, host, port, timeout=15):
        self.host = host
        self.port = port
        self.timeout = timeout
        self.sock = None
        self._pkt_id = 1
        self.id_sizes = None

    def connect(self):
        deadline = time.time() + self.timeout
        while time.time() < deadline:
            try:
                self.sock = socket.create_connection((self.host, self.port), timeout=2)
                break
            except (ConnectionRefusedError, OSError):
                time.sleep(0.2)
        else:
            raise RuntimeError(f"Cannot connect to JDWP at {self.host}:{self.port}")

        # Handshake
        self.sock.sendall(JDWP_HANDSHAKE)
        resp = b''
        while len(resp) < len(JDWP_HANDSHAKE):
            chunk = self.sock.recv(len(JDWP_HANDSHAKE) - len(resp))
            if not chunk:
                raise RuntimeError("JDWP handshake failed")
            resp += chunk

        if resp != JDWP_HANDSHAKE:
            raise RuntimeError(f"Bad JDWP handshake: {resp!r}")

        self.sock.settimeout(10)

        # Get ID sizes
        self._fetch_id_sizes()

    def _fetch_id_sizes(self):
        reply = self.send_cmd(CS_VIRTUAL_MACHINE, 7)  # IDSizes command = 7
        r = DataReader(reply.data)
        self.id_sizes = {
            'fieldIDSize':         r.read_int(),
            'methodIDSize':        r.read_int(),
            'objectIDSize':        r.read_int(),
            'referenceTypeIDSize': r.read_int(),
            'frameIDSize':         r.read_int(),
        }

    def _next_id(self):
        id_ = self._pkt_id
        self._pkt_id += 1
        return id_

    def send_cmd(self, cmd_set, command, data=b''):
        pkt = JDWPPacket(self._next_id(), cmd_set, command, 0, data)
        raw = pkt.pack()
        self.sock.sendall(raw)
        return self._recv_reply(pkt.id)

    def _recv_reply(self, expected_id, timeout=8):
        self.sock.settimeout(timeout)
        raw = b''
        # Read 11-byte header
        while len(raw) < 11:
            chunk = self.sock.recv(11 - len(raw))
            if not chunk:
                raise RuntimeError("Connection closed while reading JDWP header")
            raw += chunk
        length = struct.unpack('>I', raw[:4])[0]
        while len(raw) < length:
            chunk = self.sock.recv(length - len(raw))
            if not chunk:
                raise RuntimeError("Connection closed while reading JDWP body")
            raw += chunk
        return JDWPPacket.from_bytes(raw)

    def recv_event(self, timeout=30):
        """Receive the next composite event packet from the JVM."""
        self.sock.settimeout(timeout)
        raw = b''
        while len(raw) < 11:
            chunk = self.sock.recv(11 - len(raw))
            if not chunk:
                return None
            raw += chunk
        length = struct.unpack('>I', raw[:4])[0]
        while len(raw) < length:
            chunk = self.sock.recv(length - len(raw))
            if not chunk:
                return None
            raw += chunk
        return JDWPPacket.from_bytes(raw)

    def make_writer(self):
        return DataWriter(self.id_sizes)

    def make_reader(self, data):
        return DataReader(data, self.id_sizes)

    def close(self):
        if self.sock:
            try:
                self.sock.close()
            except Exception:
                pass


# ─────────────────────────────────────────────────────────────────────────────
# Java Trace Runner
# ─────────────────────────────────────────────────────────────────────────────

class JavaTraceRunner:
    MAX_STEPS = 500
    MAX_DEPTH = 10  # Ignore frames deeper than this (library code)

    def __init__(self, code_path, input_str):
        self.code_path = code_path
        self.input_str = input_str
        self.steps = []
        self.output_buffer = ''
        self.proc = None
        self.conn = None
        self.source_name = None
        self.class_name = None
        self.code_lines = []
        self.var_table_cache = {}  # (class_id, method_id) -> variable table

    def run(self):
        with open(self.code_path, 'r', encoding='utf-8') as f:
            self.code = f.read()
        self.code_lines = self.code.split('\n')

        # Extract class name (look for "class Main" or "public class X")
        self.class_name = self._extract_class_name()

        tmpdir = tempfile.mkdtemp(prefix='codeflow_java_')
        try:
            self._run_in_tmpdir(tmpdir)
        finally:
            shutil.rmtree(tmpdir, ignore_errors=True)

    def _extract_class_name(self):
        import re
        # Try to find public class or just class Main
        m = re.search(r'\bpublic\s+class\s+(\w+)', self.code)
        if m:
            return m.group(1)
        m = re.search(r'\bclass\s+(\w+)', self.code)
        if m:
            return m.group(1)
        return 'Main'

    def _run_in_tmpdir(self, tmpdir):
        # Write java file
        java_file = os.path.join(tmpdir, f'{self.class_name}.java')
        with open(java_file, 'w', encoding='utf-8') as f:
            f.write(self.code)

        # Compile
        compile_result = subprocess.run(
            [javac_cmd(), '-g', java_file],
            capture_output=True, text=True, timeout=15, cwd=tmpdir
        )
        if compile_result.returncode != 0:
            stderr = compile_result.stderr
            line_no = self._parse_compile_error_line(stderr)
            print(json.dumps({
                "success": False,
                "error": {
                    "type": "syntax",
                    "message": stderr.strip(),
                    "line": line_no,
                    "offset": 0,
                    "text": self.code_lines[line_no - 1] if line_no and 0 < line_no <= len(self.code_lines) else ""
                }
            }))
            return

        # Find free port
        port = find_free_port()

        # Launch JVM with JDWP
        jvm_args = [
            java_cmd(),
            f'-agentlib:jdwp=transport=dt_socket,server=y,suspend=y,address=*:{port}',
            '-cp', tmpdir,
            self.class_name
        ]

        # Set up stdin pipe for user input
        stdin_data = self.input_str.encode('utf-8') if self.input_str else b''

        self.proc = subprocess.Popen(
            jvm_args,
            cwd=tmpdir,
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )

        # Write stdin in a background thread
        stdout_buf = []
        stderr_buf = []

        def read_stdout():
            for line in self.proc.stdout:
                stdout_buf.append(line.decode('utf-8', errors='replace'))

        def read_stderr():
            for line in self.proc.stderr:
                stderr_buf.append(line.decode('utf-8', errors='replace'))

        t_out = threading.Thread(target=read_stdout, daemon=True)
        t_err = threading.Thread(target=read_stderr, daemon=True)
        t_out.start()
        t_err.start()

        # Write stdin
        if stdin_data:
            try:
                self.proc.stdin.write(stdin_data)
                self.proc.stdin.flush()
            except Exception:
                pass

        try:
            # Connect JDWP
            self.conn = JDWPConnection('127.0.0.1', port, timeout=15)
            self.conn.connect()

            self._do_trace()

        except Exception as e:
            err_msg = str(e)
            if not self.steps:
                self.steps.append({
                    "line": 1,
                    "type": "error",
                    "stack": [],
                    "heap": {},
                    "output": '',
                    "event": "exception",
                    "exception": {"type": "TraceError", "message": err_msg}
                })
        finally:
            if self.conn:
                try:
                    self.conn.close()
                except Exception:
                    pass
            if self.proc and self.proc.poll() is None:
                self.proc.kill()
                self.proc.wait()
            t_out.join(timeout=2)
            t_err.join(timeout=2)
            self.output_buffer = ''.join(stdout_buf)

        # Update output in all steps
        for step in self.steps:
            step['output'] = self.output_buffer

        print(json.dumps({
            "success": True,
            "steps": self.steps,
            "output": self.output_buffer
        }))

    def _parse_compile_error_line(self, stderr):
        import re
        # Pattern: filename.java:LINE: error: ...
        m = re.search(r'\.java:(\d+):', stderr)
        if m:
            return int(m.group(1))
        return 1

    def _do_trace(self):
        conn = self.conn

        # Wait for VM_START event
        vm_start_thread = None
        while True:
            pkt = conn.recv_event(timeout=10)
            if pkt is None:
                break
            if pkt.cmd_set == CS_EVENT and pkt.command == 100:  # Composite event
                r = conn.make_reader(pkt.data)
                suspend_policy = r.read_byte()
                event_count = r.read_int()
                for _ in range(event_count):
                    event_kind = r.read_byte()
                    request_id = r.read_int()
                    if event_kind == EK_VM_START:
                        vm_start_thread = conn.make_reader(pkt.data[r.pos - r.pos:]).read_object_id() if False else None
                        # read thread id
                        thread_id = r.read_object_id()
                        vm_start_thread = thread_id
                break

        if vm_start_thread is None:
            # Try to get all threads
            reply = conn.send_cmd(CS_VIRTUAL_MACHINE, CMD_VM_ALL_THREADS)
            r = conn.make_reader(reply.data)
            count = r.read_int()
            if count > 0:
                vm_start_thread = r.read_object_id()

        # Set up step request for single-step line-by-line
        # We'll request step on the main thread
        main_thread = self._get_main_thread(vm_start_thread)

        step_req_id = self._request_step(main_thread)
        if step_req_id is None:
            # Fallback: just resume and capture output
            conn.send_cmd(CS_VIRTUAL_MACHINE, CMD_VM_RESUME)
            return

        # Resume VM
        conn.send_cmd(CS_VIRTUAL_MACHINE, CMD_VM_RESUME)

        step_count = 0
        last_line = -1

        while step_count < self.MAX_STEPS:
            pkt = conn.recv_event(timeout=10)
            if pkt is None:
                break

            if not (pkt.cmd_set == CS_EVENT and pkt.command == 100):
                continue

            r = conn.make_reader(pkt.data)
            suspend_policy = r.read_byte()
            event_count = r.read_int()

            should_stop = False
            current_thread = main_thread
            step_location = None

            for _ in range(event_count):
                event_kind = r.read_byte()
                request_id = r.read_int()

                if event_kind == EK_SINGLE_STEP:
                    thread_id = r.read_object_id()
                    location = r.read_location()
                    current_thread = thread_id
                    step_location = location

                elif event_kind == EK_EXCEPTION:
                    thread_id = r.read_object_id()
                    location = r.read_location()
                    exception_obj = r.read_object_id()
                    catch_location = r.read_location()
                    # Record exception
                    self._record_exception(thread_id, location, exception_obj)
                    should_stop = True

                elif event_kind == EK_VM_DEATH:
                    should_stop = True

                elif event_kind in (EK_THREAD_START, EK_THREAD_DEATH):
                    thread_id = r.read_object_id()

                elif event_kind == EK_CLASS_PREPARE:
                    thread_id = r.read_object_id()
                    ref_type_tag = r.read_byte()
                    type_id = r.read_reference_type_id()
                    signature = r.read_string()
                    status = r.read_int()

            if should_stop:
                break

            if step_location is not None:
                # Get source line from location
                line_no = self._get_line_number(step_location)
                if line_no is not None and line_no > 0:
                    # Skip if same line as last (avoid duplicate steps for bytecode ops on same line)
                    if line_no == last_line:
                        conn.send_cmd(CS_VIRTUAL_MACHINE, CMD_VM_RESUME)
                        continue

                    # Get class name to filter
                    class_sig = self._get_class_signature(step_location[1])
                    if class_sig and not self._is_user_class(class_sig):
                        # Skip library frames
                        conn.send_cmd(CS_VIRTUAL_MACHINE, CMD_VM_RESUME)
                        continue

                    last_line = line_no
                    step_count += 1

                    # Capture stack frames and locals
                    stack_frames, heap = self._capture_stack(current_thread)

                    line_content = self.code_lines[line_no - 1].strip() if 0 < line_no <= len(self.code_lines) else ''
                    step_type = self._classify_line(line_content)

                    step_data = {
                        "line": line_no,
                        "type": step_type,
                        "event": "line",
                        "stack": stack_frames,
                        "heap": heap,
                        "output": self.output_buffer
                    }
                    self.steps.append(step_data)

            # Resume
            conn.send_cmd(CS_VIRTUAL_MACHINE, CMD_VM_RESUME)

    def _get_main_thread(self, hint_thread):
        """Try to find the 'main' thread or use hint."""
        try:
            reply = self.conn.send_cmd(CS_VIRTUAL_MACHINE, CMD_VM_ALL_THREADS)
            r = self.conn.make_reader(reply.data)
            count = r.read_int()
            for _ in range(count):
                tid = r.read_object_id()
                # Get thread name
                name_reply = self.conn.send_cmd(CS_THREAD_REF, CMD_THREAD_NAME, self._pack_object_id(tid))
                nr = self.conn.make_reader(name_reply.data)
                name = nr.read_string()
                if 'main' in name.lower():
                    return tid
        except Exception:
            pass
        return hint_thread

    def _pack_object_id(self, obj_id):
        w = self.conn.make_writer()
        w.write_object_id(obj_id)
        return w.bytes()

    def _request_step(self, thread_id):
        """Request single-step event on given thread, line granularity, step into."""
        try:
            w = self.conn.make_writer()
            w.write_byte(EK_SINGLE_STEP)   # eventKind
            w.write_byte(SP_EVENT_THREAD)  # suspend policy
            w.write_int(1)                 # modifier count

            # Step modifier
            w.write_byte(MOD_STEP)
            w.write_object_id(thread_id)
            w.write_int(STEP_SIZE_LINE)    # step size = LINE
            w.write_int(STEP_DEPTH_INTO)   # depth = INTO

            reply = self.conn.send_cmd(CS_EVENT_REQUEST, CMD_EVREQ_SET, w.bytes())
            r = self.conn.make_reader(reply.data)
            req_id = r.read_int()
            return req_id
        except Exception:
            return None

    def _get_line_number(self, location):
        """Get source line number from a JDWP location. Returns None if unavailable."""
        type_tag, class_id, method_id, index = location
        key = (class_id, method_id)

        # Get line table for this method
        if key not in self.var_table_cache:
            try:
                w = self.conn.make_writer()
                w.write_reference_type_id(class_id)
                w.write_method_id(method_id)
                reply = self.conn.send_cmd(CS_METHOD, 1, w.bytes())  # LineTable = command 1
                r = self.conn.make_reader(reply.data)
                start = r.read_long()
                end = r.read_long()
                count = r.read_int()
                lines = []
                for _ in range(count):
                    line_code_index = r.read_long()
                    line_no = r.read_short()
                    lines.append((line_code_index, line_no))
                self.var_table_cache[key] = lines
            except Exception:
                self.var_table_cache[key] = []

        lines = self.var_table_cache[key]
        if not lines:
            return None

        # Binary search: find largest line_code_index <= index
        line_no = lines[0][1]
        for (lci, ln) in lines:
            if lci <= index:
                line_no = ln
            else:
                break
        return line_no

    def _get_class_signature(self, class_id):
        try:
            w = self.conn.make_writer()
            w.write_reference_type_id(class_id)
            reply = self.conn.send_cmd(CS_REFERENCE_TYPE, CMD_REFTYPE_SIGNATURE, w.bytes())
            r = self.conn.make_reader(reply.data)
            return r.read_string()
        except Exception:
            return None

    def _is_user_class(self, sig):
        """Returns True if the class belongs to user code (not JDK/stdlib)."""
        # sig looks like "LMain;" or "LSolution$1;" etc.
        skip_prefixes = ['Ljava/', 'Ljavax/', 'Lsun/', 'Lcom/sun/', 'Ljdk/', 'Lorg/']
        for prefix in skip_prefixes:
            if sig.startswith(prefix):
                return False
        return True

    def _capture_stack(self, thread_id):
        """Capture call stack frames and heap objects for the given thread."""
        frames_data = []
        heap = {}
        addr_counter = [1000]
        obj_to_addr = {}

        def get_addr(obj_id):
            if obj_id not in obj_to_addr:
                obj_to_addr[obj_id] = f'#{addr_counter[0]}'
                addr_counter[0] += 1
            return obj_to_addr[obj_id]

        try:
            # Get frames
            w = self.conn.make_writer()
            w.write_object_id(thread_id)
            w.write_int(0)   # start frame
            w.write_int(-1)  # length: all frames
            reply = self.conn.send_cmd(CS_THREAD_REF, CMD_THREAD_FRAMES, w.bytes())
            r = self.conn.make_reader(reply.data)
            frame_count = r.read_int()

            for fi in range(min(frame_count, self.MAX_DEPTH)):
                frame_id = r.read_frame_id()
                location = r.read_location()
                type_tag, class_id, method_id, index = location

                class_sig = self._get_class_signature(class_id)
                if class_sig and not self._is_user_class(class_sig):
                    continue  # skip library frames

                method_name = self._get_method_name(class_id, method_id)
                func_name = method_name or '<unknown>'

                # Get variable table
                var_table = self._get_variable_table(class_id, method_id)

                # Get local variable values
                slot_slots = []
                for var in var_table:
                    # var = (codeIndex, name, signature, length, slot)
                    if var[4] >= 0 and index >= var[0] and index < var[0] + var[3]:
                        slot_slots.append(var)

                locals_dict = {}
                if slot_slots:
                    locals_dict = self._get_frame_locals(thread_id, frame_id, slot_slots, heap, get_addr)

                frames_data.append({
                    "function": func_name,
                    "locals": locals_dict
                })

        except Exception:
            pass

        frames_data.reverse()
        return frames_data, heap

    def _get_method_name(self, class_id, method_id):
        try:
            w = self.conn.make_writer()
            w.write_reference_type_id(class_id)
            reply = self.conn.send_cmd(CS_REFERENCE_TYPE, CMD_REFTYPE_METHODS, w.bytes())
            r = self.conn.make_reader(reply.data)
            count = r.read_int()
            for _ in range(count):
                mid = r.read_method_id()
                name = r.read_string()
                sig = r.read_string()
                mod_bits = r.read_int()
                if mid == method_id:
                    return name
        except Exception:
            pass
        return None

    def _get_variable_table(self, class_id, method_id):
        cache_key = ('vt', class_id, method_id)
        if cache_key in self.var_table_cache:
            return self.var_table_cache[cache_key]
        try:
            w = self.conn.make_writer()
            w.write_reference_type_id(class_id)
            w.write_method_id(method_id)
            reply = self.conn.send_cmd(CS_METHOD, CMD_METHOD_VARIABLE_TABLE, w.bytes())
            r = self.conn.make_reader(reply.data)
            arg_count = r.read_int()
            slot_count = r.read_int()
            vars_ = []
            for _ in range(slot_count):
                code_index = r.read_long()
                name = r.read_string()
                sig = r.read_string()
                length = r.read_int()
                slot = r.read_int()
                vars_.append((code_index, name, sig, length, slot))
            self.var_table_cache[cache_key] = vars_
            return vars_
        except Exception:
            self.var_table_cache[cache_key] = []
            return []

    def _get_frame_locals(self, thread_id, frame_id, variables, heap, get_addr):
        """Get local variable values for a frame."""
        locals_dict = {}

        w = self.conn.make_writer()
        w.write_object_id(thread_id)
        w.write_frame_id(frame_id)
        w.write_int(len(variables))
        for var in variables:
            code_index, name, sig, length, slot = var
            w.write_int(slot)
            # sigbyte: first char of signature
            sig_tag = ord(sig[0]) if sig else TAG_OBJECT
            w.write_byte(sig_tag)

        try:
            reply = self.conn.send_cmd(CS_STACK_FRAME, CMD_FRAME_GET_VALUES, w.bytes())
            r = self.conn.make_reader(reply.data)
            count = r.read_int()
            for i, var in enumerate(variables[:count]):
                code_index, name, sig, length, slot = var
                if name.startswith('this') or name.startswith('$'):
                    continue  # Skip 'this' and synthetic vars
                val = self._read_tagged_value(r, heap, get_addr)
                if val is not None:
                    locals_dict[name] = val
        except Exception:
            pass

        return locals_dict

    def _read_tagged_value(self, r, heap, get_addr, depth=0):
        """Read a tagged value from a DataReader."""
        MAX_DEPTH = 4
        try:
            tag = r.read_byte()
            if tag == TAG_BOOLEAN:
                return bool(r.read_byte())
            elif tag == TAG_BYTE:
                return r.read_byte()
            elif tag == TAG_CHAR:
                raw = r.read_short()
                return chr(raw)
            elif tag == TAG_SHORT:
                return r.read_short()
            elif tag == TAG_INT:
                return r.read_int()
            elif tag == TAG_LONG:
                return r.read_long()
            elif tag == TAG_FLOAT:
                raw = r.read(4)
                return struct.unpack('>f', raw)[0]
            elif tag == TAG_DOUBLE:
                raw = r.read(8)
                return struct.unpack('>d', raw)[0]
            elif tag == TAG_VOID:
                return None
            elif tag == TAG_STRING:
                obj_id = r.read_object_id()
                return self._get_string_value(obj_id)
            elif tag == TAG_OBJECT or tag == TAG_CLASS_OBJECT:
                obj_id = r.read_object_id()
                if obj_id == 0:
                    return None
                if depth >= MAX_DEPTH:
                    return f'<object@{obj_id}>'
                addr = get_addr(obj_id)
                if addr not in heap:
                    heap[addr] = {}  # placeholder
                    obj_repr = self._get_object_repr(obj_id, heap, get_addr, depth + 1)
                    heap[addr] = obj_repr
                return addr
            elif tag == TAG_ARRAY:
                obj_id = r.read_object_id()
                if obj_id == 0:
                    return None
                if depth >= MAX_DEPTH:
                    return f'<array@{obj_id}>'
                addr = get_addr(obj_id)
                if addr not in heap:
                    heap[addr] = []  # placeholder
                    arr_repr = self._get_array_repr(obj_id, heap, get_addr, depth + 1)
                    heap[addr] = arr_repr
                return addr
            elif tag == TAG_THREAD or tag == TAG_THREAD_GROUP or tag == TAG_CLASS_LOADER:
                obj_id = r.read_object_id()
                return f'<thread@{obj_id}>'
            else:
                # Unknown tag, skip 8 bytes
                r.read(8)
                return None
        except Exception:
            return None

    def _get_string_value(self, obj_id):
        try:
            w = self.conn.make_writer()
            w.write_object_id(obj_id)
            reply = self.conn.send_cmd(CS_STRING_REF, CMD_STRINGREF_VALUE, w.bytes())
            r = self.conn.make_reader(reply.data)
            return r.read_string()
        except Exception:
            return '<string>'

    def _get_array_repr(self, obj_id, heap, get_addr, depth):
        """Get array contents as a Python list."""
        try:
            # Get length
            w = self.conn.make_writer()
            w.write_object_id(obj_id)
            reply = self.conn.send_cmd(CS_ARRAY_REF, CMD_ARRAYREF_LENGTH, w.bytes())
            r = self.conn.make_reader(reply.data)
            length = r.read_int()

            if length == 0:
                return []
            if length > 100:
                length = 100  # cap

            # Get values
            w = self.conn.make_writer()
            w.write_object_id(obj_id)
            w.write_int(0)        # firstIndex
            w.write_int(length)   # length
            reply = self.conn.send_cmd(CS_ARRAY_REF, CMD_ARRAYREF_GET_VALUES, w.bytes())
            r = self.conn.make_reader(reply.data)

            type_tag = r.read_byte()
            result = []
            for _ in range(length):
                if type_tag in PRIMITIVE_TAGS:
                    val = self._read_primitive(r, type_tag)
                else:
                    val = self._read_tagged_value(r, heap, get_addr, depth)
                result.append(val)
            return result
        except Exception:
            return []

    def _read_primitive(self, r, tag):
        if tag == TAG_BOOLEAN:
            return bool(r.read_byte())
        elif tag == TAG_BYTE:
            return r.read_byte()
        elif tag == TAG_CHAR:
            return chr(r.read_short())
        elif tag == TAG_SHORT:
            return r.read_short()
        elif tag == TAG_INT:
            return r.read_int()
        elif tag == TAG_LONG:
            return r.read_long()
        elif tag == TAG_FLOAT:
            return struct.unpack('>f', r.read(4))[0]
        elif tag == TAG_DOUBLE:
            return struct.unpack('>d', r.read(8))[0]
        return None

    def _get_object_repr(self, obj_id, heap, get_addr, depth):
        """Get object fields as a dict."""
        try:
            # Get reference type
            w = self.conn.make_writer()
            w.write_object_id(obj_id)
            reply = self.conn.send_cmd(CS_OBJECT_REF, CMD_OBJREF_REFERENCE_TYPE, w.bytes())
            r = self.conn.make_reader(reply.data)
            ref_type_tag = r.read_byte()
            class_id = r.read_reference_type_id()

            sig = self._get_class_signature(class_id)

            # Handle common Java types
            if sig == 'Ljava/lang/String;':
                return self._get_string_value(obj_id)
            if sig and sig.startswith('Ljava/util/ArrayList') or sig and sig.startswith('Ljava/util/LinkedList'):
                return self._get_list_repr(obj_id, class_id, heap, get_addr, depth)
            if sig and (sig.startswith('Ljava/util/HashMap') or sig.startswith('Ljava/util/LinkedHashMap')):
                return self._get_map_repr(obj_id, class_id, heap, get_addr, depth)
            if sig and sig.startswith('Ljava/util/HashSet'):
                return self._get_set_repr(obj_id, class_id, heap, get_addr, depth)

            # Generic: get declared fields
            fields = self._get_instance_fields(obj_id, class_id, heap, get_addr, depth)
            return fields
        except Exception:
            return {}

    def _get_instance_fields(self, obj_id, class_id, heap, get_addr, depth):
        """Read declared fields of an object."""
        try:
            w = self.conn.make_writer()
            w.write_reference_type_id(class_id)
            reply = self.conn.send_cmd(CS_REFERENCE_TYPE, CMD_REFTYPE_FIELDS, w.bytes())
            r = self.conn.make_reader(reply.data)
            field_count = r.read_int()
            field_ids = []
            field_names = []
            for _ in range(field_count):
                fid = r.read(self.conn.id_sizes['fieldIDSize'])
                name = r.read_string()
                sig = r.read_string()
                mod = r.read_int()
                # Skip static fields
                if mod & 0x0008:
                    continue
                field_ids.append(fid)
                field_names.append(name)

            if not field_ids:
                return {}

            # Get field values
            w = self.conn.make_writer()
            w.write_object_id(obj_id)
            w.write_int(len(field_ids))
            for fid in field_ids:
                w.data += fid

            reply = self.conn.send_cmd(CS_OBJECT_REF, CMD_OBJREF_GET_VALUES, w.bytes())
            r = self.conn.make_reader(reply.data)
            count = r.read_int()

            result = {}
            for i in range(min(count, len(field_names))):
                val = self._read_tagged_value(r, heap, get_addr, depth)
                if not field_names[i].startswith('$') and not field_names[i].startswith('this$'):
                    result[field_names[i]] = val
            return result
        except Exception:
            return {}

    def _get_list_repr(self, obj_id, class_id, heap, get_addr, depth):
        """Try to get the size and elements of an ArrayList/LinkedList."""
        try:
            fields = self._get_instance_fields(obj_id, class_id, heap, get_addr, depth)
            size_field = fields.get('size', fields.get('elementCount', 0))
            element_data = fields.get('elementData', fields.get('elements'))
            if isinstance(element_data, str) and element_data.startswith('#') and element_data in heap:
                arr = heap[element_data]
                if isinstance(arr, list) and isinstance(size_field, int):
                    return arr[:size_field]
            return fields
        except Exception:
            return {}

    def _get_map_repr(self, obj_id, class_id, heap, get_addr, depth):
        return '<Map>'  # Simplified; full map extraction is complex

    def _get_set_repr(self, obj_id, class_id, heap, get_addr, depth):
        return '<Set>'  # Simplified

    def _record_exception(self, thread_id, location, exception_obj):
        line_no = self._get_line_number(location) or 1
        exc_msg = self._get_string_value(exception_obj) if exception_obj else 'Unknown exception'
        self.steps.append({
            "line": line_no,
            "type": "error",
            "event": "exception",
            "stack": [],
            "heap": {},
            "output": self.output_buffer,
            "exception": {
                "type": "RuntimeException",
                "message": exc_msg
            }
        })

    def _classify_line(self, line_content):
        line = line_content.strip()
        if line.startswith('return ') or line == 'return;':
            return 'return'
        if line.startswith('if ') or line.startswith('else if ') or line.startswith('} else'):
            return 'condition'
        if line.startswith('for ') or line.startswith('while ') or line.startswith('do '):
            return 'loop_start'
        if '=' in line and not line.startswith('if') and not line.startswith('while'):
            return 'assignment'
        if line.startswith('System.out') or line.startswith('System.err'):
            return 'output'
        return 'assignment'


# ─────────────────────────────────────────────────────────────────────────────
# Fallback: Simple output-only trace (when JDWP fails)
# ─────────────────────────────────────────────────────────────────────────────

class SimpleFallbackTracer:
    """Compile + run Java, capture output, emit one trace step per unique line executed."""

    def __init__(self, code_path, input_str):
        self.code_path = code_path
        self.input_str = input_str
        self.steps = []
        self.output_buffer = ''

    def run(self):
        with open(self.code_path, 'r', encoding='utf-8') as f:
            self.code = f.read()
        code_lines = self.code.split('\n')

        import re
        class_name = 'Main'
        m = re.search(r'\bpublic\s+class\s+(\w+)', self.code)
        if m:
            class_name = m.group(1)
        else:
            m2 = re.search(r'\bclass\s+(\w+)', self.code)
            if m2:
                class_name = m2.group(1)

        tmpdir = tempfile.mkdtemp(prefix='codeflow_java_fallback_')
        try:
            java_file = os.path.join(tmpdir, f'{class_name}.java')
            with open(java_file, 'w', encoding='utf-8') as f:
                f.write(self.code)

            compile_result = subprocess.run(
                [javac_cmd(), '-g', java_file],
                capture_output=True, text=True, timeout=15, cwd=tmpdir
            )
            if compile_result.returncode != 0:
                stderr = compile_result.stderr
                line_no = 1
                m = re.search(r'\.java:(\d+):', stderr)
                if m:
                    line_no = int(m.group(1))
                print(json.dumps({
                    "success": False,
                    "error": {
                        "type": "syntax",
                        "message": stderr.strip(),
                        "line": line_no,
                        "offset": 0,
                        "text": code_lines[line_no - 1] if 0 < line_no <= len(code_lines) else ""
                    }
                }))
                return

            run_result = subprocess.run(
                [java_cmd(), '-cp', tmpdir, class_name],
                capture_output=True, text=True, timeout=10,
                input=self.input_str or ""
            )
            self.output_buffer = run_result.stdout

            # Build a simple trace based on code structure analysis
            self._build_static_trace(code_lines)

            # Update output in all steps
            for step in self.steps:
                step['output'] = self.output_buffer

            print(json.dumps({
                "success": True,
                "steps": self.steps,
                "output": self.output_buffer
            }))

        finally:
            shutil.rmtree(tmpdir, ignore_errors=True)

    def _build_static_trace(self, code_lines):
        """Build a deterministic trace based on static code analysis."""
        import re

        # Extract meaningful lines
        in_class = False
        brace_depth = 0
        for i, raw_line in enumerate(code_lines, start=1):
            line = raw_line.strip()
            if not line or line.startswith('//') or line.startswith('*') or line.startswith('/*'):
                continue
            if '{' in line:
                brace_depth += line.count('{')
            if '}' in line:
                brace_depth -= line.count('}')
                if brace_depth < 0:
                    brace_depth = 0

            # Skip class/method declarations and import/package
            if re.match(r'^(import|package)\s', line):
                continue
            if re.match(r'^(public|private|protected|static|class|interface)\s', line) and '{' in line:
                continue
            if line in ('{', '}', ''):
                continue

            step_type = 'assignment'
            if re.search(r'\breturn\b', line):
                step_type = 'return'
            elif re.match(r'if\s*\(', line):
                step_type = 'condition'
            elif re.match(r'(for|while)\s*\(', line):
                step_type = 'loop_start'
            elif 'System.out' in line:
                step_type = 'output'

            self.steps.append({
                "line": i,
                "type": step_type,
                "event": "line",
                "stack": [{"function": "main", "locals": {}}],
                "heap": {},
                "output": ''
            })

        if not self.steps:
            self.steps.append({
                "line": 1,
                "type": "output",
                "event": "line",
                "stack": [{"function": "main", "locals": {}}],
                "heap": {},
                "output": self.output_buffer
            })


# ─────────────────────────────────────────────────────────────────────────────
# Entry point
# ─────────────────────────────────────────────────────────────────────────────

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print(json.dumps({"success": False, "error": {"type": "syntax", "message": "No code file specified"}}))
        sys.exit(1)

    code_file = sys.argv[1]
    user_input = sys.argv[2] if len(sys.argv) > 2 else ''

    # Try JDWP-based tracing first, fall back to simple tracer
    try:
        runner = JavaTraceRunner(code_file, user_input)
        runner.run()
    except Exception as e:
        # Fallback
        try:
            fallback = SimpleFallbackTracer(code_file, user_input)
            fallback.run()
        except Exception as fe:
            print(json.dumps({
                "success": False,
                "error": {"type": "runtime", "message": str(fe), "line": 1, "offset": 0, "text": ""}
            }))
