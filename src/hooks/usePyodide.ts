
import { useEffect, useRef, useState } from 'react';

declare global {
    interface Window {
        loadPyodide: any;
    }
}

export function usePyodide() {
    const [isReady, setIsReady] = useState(false);
    const [output, setOutput] = useState<string[]>([]);
    const [isRunning, setIsRunning] = useState(false);
    const pyodideRef = useRef<any>(null);

    useEffect(() => {
        const loadPyodideScript = async () => {
            if (window.loadPyodide && !pyodideRef.current) {
                // Already loaded script, just init
                pyodideRef.current = await window.loadPyodide({
                    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/"
                });
                setIsReady(true);
                return;
            }

            if (pyodideRef.current) return; // Already initialized

            const script = document.createElement('script');
            script.src = "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js";
            script.async = true;
            script.onload = async () => {
                try {
                    pyodideRef.current = await window.loadPyodide({
                        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/"
                    });
                    // Redirect stdout to our output array
                    pyodideRef.current.setStdout({
                        batched: (msg: string) => {
                            setOutput((prev) => [...prev, msg]);
                        }
                    });
                    setIsReady(true);
                } catch (err) {
                    console.error("Failed to load Pyodide", err);
                }
            };
            document.body.appendChild(script);
        };

        loadPyodideScript();
    }, []);

    const runCode = async (code: string) => {
        if (!pyodideRef.current) return;
        setIsRunning(true);
        setOutput([]); // Clear previous output
        try {
            // We manually redirect stdout in the python code or use the setStdout config above.
            // The setStdout above captures print() calls.
            // The return value of runPythonAsync is the result of the last expression.
            await pyodideRef.current.runPythonAsync(code);
        } catch (err: any) {
            setOutput((prev) => [...prev, `Error: ${err.message}`]);
        } finally {
            setIsRunning(false);
        }
    };

    const resetOutput = () => setOutput([]);

    return { isReady, runCode, output, isRunning, resetOutput };
}
