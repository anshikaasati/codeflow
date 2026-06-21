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
    const hoverProviderRef = useRef<any>(null);
    const clickDisposableRef = useRef<any>(null);

    const handleEditorDidMount = (editor: any, monaco: Monaco) => {
        editorRef.current = editor;
        monacoRef.current = monaco;

        // Clean up previous click listener if exists
        if (clickDisposableRef.current) clickDisposableRef.current.dispose();

        // Register click handler to jump to first matching trace step
        clickDisposableRef.current = editor.onMouseDown((e: any) => {
            const target = e.target;
            if (target && target.position) {
                const lineNum = target.position.lineNumber;
                const store = useExecutionStore.getState();
                const stepsArray = store.traceSteps.length > 0 ? store.traceSteps : store.traces;
                
                if (stepsArray.length === 0) return;
                
                const firstStepIdx = stepsArray.findIndex(s => s.line === lineNum);
                if (firstStepIdx !== -1) {
                    useExecutionStore.setState({ currentStepIndex: firstStepIdx });
                }
            }
        });
    };

    // Register hover provider dynamically when currentLanguage or monaco changes
    useEffect(() => {
        if (!monacoRef.current) return;

        if (hoverProviderRef.current) {
            hoverProviderRef.current.dispose();
        }

        hoverProviderRef.current = monacoRef.current.languages.registerHoverProvider(currentLanguage, {
            provideHover: (model, position) => {
                const store = useExecutionStore.getState();
                const stepsArray = store.traceSteps.length > 0 ? store.traceSteps : store.traces;
                
                if (stepsArray.length === 0) return null;
                
                const lineNum = position.lineNumber;
                const lineSteps = stepsArray
                    .map((step, idx) => ({ step, idx }))
                    .filter(x => x.step.line === lineNum);
                
                if (lineSteps.length === 0) return null;
                
                const markdownContents = lineSteps.map(({ step, idx }) => {
                    const varsStr = Object.entries(step.variables || {})
                        .map(([k, v]) => `${k} = ${JSON.stringify(v)}`)
                        .join(', ');
                    
                    return `**Step ${idx + 1}**: ${step.teacherNote?.what || step.explanation || 'Line Executed'}\n` +
                           (step.teacherNote?.why ? `*Detail*: ${step.teacherNote.why}\n` : '') +
                           (varsStr ? `*State*: \`${varsStr}\`\n` : '');
                }).join('\n\n---\n\n');

                return {
                    range: new monacoRef.current!.Range(lineNum, 1, lineNum, model.getLineLength(lineNum)),
                    contents: [
                        { value: `### Execution Trace Info (Line ${lineNum})` },
                        { value: markdownContents }
                    ]
                };
            }
        });
    }, [currentLanguage, code]); // Re-register when language or code content updates

    useEffect(() => {
        return () => {
            if (hoverProviderRef.current) hoverProviderRef.current.dispose();
            if (clickDisposableRef.current) clickDisposableRef.current.dispose();
        };
    }, []);

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
