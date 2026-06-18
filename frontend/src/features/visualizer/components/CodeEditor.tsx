import React, { useRef, useEffect } from 'react';
import Editor, { type Monaco } from '@monaco-editor/react';
import { useExecutionStore } from '@/store/executionStore';
import { useLanguageStore } from '@/store/languageStore';

const CodeEditor = React.memo(function CodeEditor() {
    const { code, setCode, traces, traceSteps, currentStepIndex } = useExecutionStore();
    const { currentLanguage } = useLanguageStore();
    const editorRef = useRef<any>(null);
    const monacoRef = useRef<Monaco | null>(null);
    const decorationsRef = useRef<string[]>([]);

    const handleEditorDidMount = (editor: any, monaco: Monaco) => {
        editorRef.current = editor;
        monacoRef.current = monaco;
    };

    useEffect(() => {
        if (!editorRef.current || !monacoRef.current) return;

        const stepsArray = traceSteps.length > 0 ? traceSteps : traces;
        const currentTrace = stepsArray[currentStepIndex];
        const line = currentTrace?.line;

        try {
            const model = editorRef.current.getModel();
            if (model) {
                const newDecorations: any[] = [];
                
                // Get unique visited lines from step 0 to currentStepIndex
                const visitedLines = new Set<number>();
                for (let i = 0; i <= currentStepIndex; i++) {
                    const stepLine = stepsArray[i]?.line;
                    if (stepLine && stepLine > 0 && stepLine !== line) {
                        visitedLines.add(stepLine);
                    }
                }

                // Add decorations for visited lines
                visitedLines.forEach(vl => {
                    if (vl <= model.getLineCount()) {
                        newDecorations.push({
                            range: new monacoRef.current!.Range(vl, 1, vl, 1),
                            options: {
                                isWholeLine: true,
                                className: 'bg-primary/5 border-l-2 border-primary/20 opacity-80'
                            }
                        });
                    }
                });

                // Add decoration for current line
                if (line && line > 0 && line <= model.getLineCount()) {
                    newDecorations.push({
                        range: new monacoRef.current.Range(line, 1, line, 1),
                        options: {
                            isWholeLine: true,
                            className: 'bg-accent-cyan/25 border-l-4 border-accent-cyan shadow-[0_0_15px_rgba(6,182,212,0.25)]',
                            glyphMarginClassName: 'my-glyph-margin-class'
                        }
                    });
                    editorRef.current.revealLineInCenter(line);
                }

                decorationsRef.current = editorRef.current.deltaDecorations(decorationsRef.current, newDecorations);
            }
        } catch (e) {
            console.error("Monaco Decoration Error:", e);
        }
    }, [currentStepIndex, traces, traceSteps]);

    return (
        <div className="h-full w-full border-r border-gray-700">
            <Editor
                height="100%"
                language={currentLanguage}
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value || '')}
                onMount={handleEditorDidMount}
                options={{
                    minimap: { enabled: true },
                    fontSize: 14,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    readOnly: traces.length > 0, // Disable editing if we have execution traces
                    fontFamily: 'JetBrains Mono',
                    fontLigatures: true,
                }}
            />
        </div>
    );
});

export default CodeEditor;
