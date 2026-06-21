export const ErrorRegistry = {
    COMPILATION_FAILED: {
        code: "COMPILATION_FAILED",
        friendlyMessage: "Compilation failed. Check the syntax or compiler error logs below for details."
    },
    COMPILER_NOT_FOUND: {
        code: "COMPILER_NOT_FOUND",
        friendlyMessage: "Compiler service temporarily unavailable. Falling back to the remote sandbox compiler."
    },
    OCI_RUNTIME_ERROR: {
        code: "SANDBOX_BUSY",
        friendlyMessage: "The compiler service is temporarily busy. Please wait a moment and try again."
    },
    TIMEOUT_EXCEEDED: {
        code: "EXECUTION_TIMEOUT",
        friendlyMessage: "Execution timed out. Please check for infinite loops or deep recursion in your code."
    },
    SIGSEGV: {
        code: "SIGSEGV",
        friendlyMessage: "Segmentation fault (Invalid memory access). Check for out-of-bounds array access, null pointer dereference, or stack overflow."
    },
    SIGABRT: {
        code: "SIGABRT",
        friendlyMessage: "Program aborted. This usually happens due to assertion failures, double freeing memory, or uncaught exceptions."
    },
    SIGFPE: {
        code: "SIGFPE",
        friendlyMessage: "Floating point exception (e.g., division by zero)."
    },
    SIGILL: {
        code: "SIGILL",
        friendlyMessage: "Illegal instruction. Your code attempted to execute corrupted or invalid machine instructions."
    },
    SIGKILL: {
        code: "SIGKILL",
        friendlyMessage: "Execution terminated. The program exceeded memory limits or was killed by the sandbox system."
    },
    GENERIC_SANDBOX_ERROR: {
        code: "SANDBOX_ERROR",
        friendlyMessage: "Compiler service temporarily unavailable. Please try again."
    }
};

export function getFriendlyErrorMessage(rawMessage: string): string {
    if (!rawMessage) return "An unknown error occurred during execution.";
    
    const errStr = String(rawMessage);

    if (
        errStr.includes('OCI runtime') || 
        errStr.includes('crun') || 
        errStr.includes('clone') || 
        errStr.includes('Resource temporarily unavailable')
    ) {
        return ErrorRegistry.OCI_RUNTIME_ERROR.friendlyMessage;
    }
    
    if (
        errStr.includes('limit exceeded') || 
        errStr.includes('timed out') || 
        errStr.includes('ETIMEDOUT')
    ) {
        return ErrorRegistry.TIMEOUT_EXCEEDED.friendlyMessage;
    }
    
    if (errStr.includes('ENOENT') || errStr.includes('compiler toolchain error')) {
        return ErrorRegistry.COMPILER_NOT_FOUND.friendlyMessage;
    }
    
    // Signal checks
    if (errStr.includes('SIGSEGV')) return ErrorRegistry.SIGSEGV.friendlyMessage;
    if (errStr.includes('SIGABRT')) return ErrorRegistry.SIGABRT.friendlyMessage;
    if (errStr.includes('SIGFPE')) return ErrorRegistry.SIGFPE.friendlyMessage;
    if (errStr.includes('SIGILL')) return ErrorRegistry.SIGILL.friendlyMessage;
    if (errStr.includes('SIGTERM') || errStr.includes('SIGKILL')) return ErrorRegistry.SIGKILL.friendlyMessage;
    
    return rawMessage;
}
