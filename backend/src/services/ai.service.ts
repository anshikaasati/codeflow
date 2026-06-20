import dotenv from 'dotenv';
import Groq from 'groq-sdk';
import { HeuristicComplexityService } from './heuristicComplexity.service';
dotenv.config();

export class AiService {
    private groq: Groq;
    private apiKey: string | undefined;

    // Use Llama 3.3 for best speed/quality balance (3.1 decommissioned Jan 2025)
    private readonly MODEL = "llama-3.3-70b-versatile";

    constructor() {
        const key = process.env.GROQ_API_KEY;
        this.apiKey = key ? key.trim() : undefined;

        if (!this.apiKey) {
            console.warn("GROQ_API_KEY not found. AI features will use mocks.");
        } else {
            console.log(`AI Initialized (Groq). Key starts with: ${this.apiKey.substring(0, 4)}...`);
        }

        this.groq = new Groq({ apiKey: this.apiKey || "mock-key" });
    }

    private async generateCompletion(prompt: string, jsonMode: boolean = false): Promise<string> {
        if (!this.apiKey) throw new Error("No API Key");

        try {
            const completion = await this.groq.chat.completions.create({
                messages: [{ role: 'user', content: prompt }],
                model: this.MODEL,
                temperature: 0.1,
                max_tokens: 8192,
                response_format: jsonMode ? { type: 'json_object' } : undefined
            });

            return completion.choices[0]?.message?.content || "";
        } catch (error: any) {
            console.error(`Groq API Error: ${error.message}`);
            throw error;
        }
    }

    private getAnalysisPrompt(code: string, language: string = 'cpp'): string {
        const langName = language === 'python' ? 'Python' : language === 'java' ? 'Java' : 'C++';
        const containerTerm = language === 'python'
            ? 'list, dict, set, deque, or heapq'
            : language === 'java'
                ? 'ArrayList, HashMap, HashSet, TreeMap, LinkedList, ArrayDeque, PriorityQueue, Stack, or Queue'
                : 'vector, unordered_map, unordered_set, map, set, stack, queue, or priority_queue';
        const loopExample = language === 'python'
            ? 'for i in range(n):'
            : language === 'java'
                ? 'for (int i = 0; i < n; i++)'
                : 'for(int i=0; i<n; i++)';
        return `
        Analyze this ${langName} code for complexity.
        
        Return a JSON object with the following keys:
        - "title": A brief descriptive title for the algorithm/code
        - "timeComplexity": Time complexity in Big-O notation (e.g., "O(N)", "O(N²)", "O(log N)")
        - "spaceComplexity": Space complexity in Big-O notation (e.g., "O(1)", "O(N)")
        - "complexityExplanation": A brief explanation of why the code has this complexity (1-2 sentences)
        - "pattern": The algorithmic pattern used (e.g., "Two Pointers", "Sliding Window", "Recursion", "Iteration", "Sorting", "Graph Traversal", "Binary Search")
        - "explanation": A map of line numbers to short explanations (e.g., {"5": "This initializes the counter"})
        - "overview": A brief summary of what the code does
        
        And these additional detailed analysis keys for our Complexity tab:
        - "timeBreakdown": Array of objects, each with "operation" and "complexity" (e.g. [{"operation": "Loop Traversal", "complexity": "O(N)"}, {"operation": "HashMap Operations", "complexity": "O(1)"}])
        - "spaceBreakdown": Array of objects, each with "structure" and "complexity" (e.g. [{"structure": "Input Array", "complexity": "O(N)"}, {"structure": "HashMap", "complexity": "O(k)"}])
        - "stepExplanations": Array of step-by-step human explanations showing how the complexity was derived (e.g. ["The algorithm traverses the array once.", "Each HashMap lookup is O(1).", "Therefore total complexity is O(N)."])
        - "detections": Array of objects detailing detected features (e.g. loops, recursion, trees, graphs, ${containerTerm}). Each object has:
            * "title": Name of detected feature (e.g. "Single Loop", "HashMap usage", "Sliding Window")
            * "detectedType": Feature type (e.g. "loop", "stl_container", "two_pointer", "sliding_window", "recursion", "sorting", "tree", "graph", "heap", "trie")
            * "codeSnippet": The specific ${langName} code snippet (e.g. "${loopExample}")
            * "complexity": Individual complexity of this feature (e.g. "O(N)" or "O(1)")
            * "explanation": Why it has this complexity
            * "visualTree": Optional array of strings showing visual reduction/calculation (e.g., for loops: ["for loop", "↓", "n iterations", "↓", "O(N)"], for nested loops: ["n", "×", "n", "=", "n²"], for binary search: ["N", "↓", "N/2", "↓", "N/4", "↓", "log N", "↓", "O(log N)"], for recursion tree: ["Levels = log n", "Work per level = n", "Total = n log n"])
        - "learningMode": An object comparing the current solution with alternatives:
            * "bruteForce": { "time": string, "space": string, "explanation": string }
            * "optimized": { "time": string, "space": string, "explanation": string }
            * "improvement": String showing complexity transition (e.g. "O(N²) → O(N)")
            * "optimizationReason": Explanation of why the optimization works
            
        Ensure the JSON is strictly formatted and valid. Do not include comments or markdown formatting in the JSON payload itself.
        
        Code:
        ${code}
        `;
    }


    private getTracePrompt(code: string, input: string): string {
        return `
        You are a strict C++ execution simulator generating a step-by-step pedagogical trace for a code visualizer (like SWE180 or PythonTutor). 
        You MUST simulate the code LINE-BY-LINE. Do NOT skip any loop iterations. Do NOT summarize steps. Every single time a line of code executes, you must generate a new step.
        
        CRITICAL RULES:
        1. STRICTLY LINE-BY-LINE: If a loop runs 5 times, you must generate steps for the loop condition and loop body 5 times.
        2. NO SKIPPING: Do not summarize "The loop finishes". Trace every exact iteration and comparison.
        3. VARIABLE TRACKING: Update the 'variables' dictionary at every step with the current precise state of local variables.
        4. POINTER VISUALS: If visualizing arrays/graphs, the 'pointers' array MUST continuously update its 'index' or 'nodeId' position to match the current variable state (e.g. if 'i' increments, the pointer for 'i' must have the new index).
        5. HIGHLIGHTING: The 'line' number must accurately reflect the exact line currently executing.
        6. CONDITIONALS: Log conditions being checked before entering if/else blocks.
        
        Input provided to the program (if any cin/scanf/arguments): "${input}"
        
        Determine if the algorithm is dealing with a specific data structure and provide a matching "visuals" object. Supported types:
        - "graph": {type: "graph", nodes: [{id, value, label}], edges: [{from, to, directed, weight}], activeNodes: [], visitedNodes: []}
        - "tree": {type: "tree", nodes: [{id, value, parentId}], activeNodes: [], visitedNodes: []}
        - "stack" | "queue": {type: "stack"|"queue", target: string, elements: any[], pointers: [{name, index, color}], activeIndices: []}
        - "array_1d": {type: "array_1d", target: string, values: any[], pointers: [{name, index, color, action}], highlightIndices: []}
        - "hash_map": {type: "hash_map", target: string, entries: [{key, value}], activeKeys: []}
        
        Return a JSON object matching this TypeScript interface exactly:
        {
            success: boolean;
            pattern?: { name: string; description: string; color: string; };
            totalSteps: number;
            output?: string;
            steps: {
                step: number; 
                line: number; 
                lineContent: string; 
                type: "assignment" | "condition" | "loop_start" | "loop_continue" | "loop_end" | "function_call" | "return" | "comparison";
                variables: Record<string, any>;
                visuals?: object; // Must match one of the schema types described above based on current state
                teacherNote: { what: string; why: string; next: string; };
            }[];
        }

        Code to trace:
        ${code}
        `;
    }

    private getFlowchartPrompt(code: string): string {
        return `
        Create a Mermaid.js flowchart (graph TD) for the logic of this code.
        Return ONLY the mermaid code string. No markdown formatting.
        
        Code:
        ${code}
        `;
    }

    public async analyzeCode(code: string, language: string = 'cpp'): Promise<any> {
        if (!this.apiKey) return this.mockAnalyze(code, language);

        const prompt = this.getAnalysisPrompt(code, language);

        try {
            const text = await this.generateCompletion(prompt, true);
            return JSON.parse(text);
        } catch (error) {
            console.warn("AI Analysis Failed, using mock.");
            return this.mockAnalyze(code, language);
        }
    }

    public async generateFlowchart(code: string): Promise<any> {
        if (!this.apiKey) return this.mockFlowchart(code);

        const prompt = this.getFlowchartPrompt(code);

        try {
            let text = await this.generateCompletion(prompt, false);
            // Clean markdown if present
            text = text.replace(/```mermaid/g, '').replace(/```/g, '').trim();
            return {
                markdown: text,
                mapping: {}
            };
        } catch (error) {
            console.warn("AI Flowchart Failed, using mock.");
            return this.mockFlowchart(code);
        }
    }

    public async generateTrace(code: string, input: string): Promise<any> {
        if (!this.apiKey) return this.mockTrace(code);

        const prompt = this.getTracePrompt(code, input);

        try {
            const text = await this.generateCompletion(prompt, true);
            const data = JSON.parse(text);
            return data;
        } catch (error) {
            console.error("AI Trace Failed:", error);
            return { success: false, error: "AI Trace generation failed." };
        }
    }

    private mockAnalyze(code: string, language: string = 'cpp'): any {
        return HeuristicComplexityService.analyzeCode(code, language);
    }

    private mockFlowchart(code: string): any {
        return {
            markdown: `graph TD;\nA([Start]) --> B[Process];\nB --> C([End]);`,
            mapping: {}
        };
    }

    private mockTrace(code: string): any {
        return {
            success: false,
            error: "No API Key available to generate trace."
        };
    }
}
