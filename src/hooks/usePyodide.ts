
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
            console.log('🐍 Starting Pyodide load...');

            if (window.loadPyodide && !pyodideRef.current) {
                console.log('✅ Pyodide script already loaded, initializing...');
                try {
                    pyodideRef.current = await window.loadPyodide({
                        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/"
                    });
                    console.log('✅ Pyodide initialized successfully');
                    setIsReady(true);
                } catch (err) {
                    console.error('❌ Failed to initialize Pyodide:', err);
                }
                return;
            }

            if (pyodideRef.current) {
                console.log('✅ Pyodide already initialized');
                return;
            }

            console.log('📥 Loading Pyodide script from CDN...');
            const script = document.createElement('script');
            script.src = "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js";
            script.async = true;
            script.onload = async () => {
                console.log('✅ Pyodide script loaded, initializing...');
                try {
                    pyodideRef.current = await window.loadPyodide({
                        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/"
                    });
                    pyodideRef.current.setStdout({
                        batched: (msg: string) => {
                            setOutput((prev) => [...prev, msg]);
                        }
                    });
                    console.log('✅ Pyodide ready!');
                    setIsReady(true);
                } catch (err) {
                    console.error('❌ Failed to initialize Pyodide:', err);
                }
            };
            script.onerror = (err) => {
                console.error('❌ Failed to load Pyodide script:', err);
            };
            document.body.appendChild(script);
            console.log('📌 Pyodide script tag added to DOM');
        };

        loadPyodideScript();
    }, []);

    const runCode = async (code: string) => {
        if (!pyodideRef.current) return;
        setIsRunning(true);
        setOutput([]);
        try {
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
