let s=null,i=!1;async function u(){if(i)return;const o=performance.now();console.log("[Worker] 🔄 Starting Pyodide initialization..."),console.log("[Worker] 📡 Loading full Python interpreter (this may take a few seconds)...");try{importScripts("https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js"),s=await loadPyodide({indexURL:"https://cdn.jsdelivr.net/pyodide/v0.25.0/full/"}),await s.runPythonAsync(`
import builtins

def custom_input(prompt=''):
    """Input is not supported in the web IDE"""
    raise NotImplementedError(
        f"{prompt}\\n\\n" +
        "❌ input() is not supported in this web-based IDE.\\n\\n" +
        "💡 Instead, use hardcoded test values:\\n\\n" +
        "# Before (doesn't work):\\n" +
        "# num1 = int(input('Enter number: '))\\n\\n" +
        "# After (works!):\\n" +
        "num1 = 5  # Use a test value\\n" +
        "num2 = 10\\n" +
        "print(num1 + num2)  # Output: 15"
    )

# Replace built-in input with custom version
builtins.input = custom_input
`);const e=((performance.now()-o)/1e3).toFixed(2);i=!0,console.log(`[Worker] ✅ Pyodide loaded successfully in ${e}s!`),self.postMessage({type:"ready"})}catch(e){console.error("[Worker] ❌ Pyodide failed to load:",e),self.postMessage({type:"error",error:`Python failed to load. Error: ${e.message}. Check your internet connection.`})}}async function l(o,e){if(!i||!s){self.postMessage({type:"result",id:e,result:{output:"",error:"Python not initialized yet. Please wait...",executionTime:0}});return}const a=performance.now();try{const n=await s.runPythonAsync(`
import sys
from io import StringIO

# Capture stdout
old_stdout = sys.stdout
sys.stdout = StringIO()

try:
${o.split(`
`).map(t=>"    "+t).join(`
`)}
    output = sys.stdout.getvalue()
finally:
    sys.stdout = old_stdout

output
`),r=performance.now()-a;self.postMessage({type:"result",id:e,result:{output:n||"",error:void 0,executionTime:r}})}catch(n){const r=performance.now()-a;let t=n.message||n.toString();t.includes("PythonError")&&(t=t.replace(/PythonError: /g,"")),self.postMessage({type:"result",id:e,result:{output:"",error:t,executionTime:r}})}}self.onmessage=async o=>{const e=o.data;switch(e.type){case"init":await u();break;case"execute":await l(e.code,e.id);break;default:console.warn("[Worker] Unknown message type:",e)}};u();
