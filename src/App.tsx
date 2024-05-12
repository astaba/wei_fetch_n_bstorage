import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" className="anchor">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" className="anchor">
          <img src={reactLogo} className="logo hover:drop-shadow-[0_0_2em_rgba(97,218,251,0.667)] motion-safe:animate-[spin_20s_linear_infinite]" alt="React logo" />
        </a>
      </div>
      <h1 className="text-[3.2em] leading-[1.1]">Vite + React</h1>
      <div className="p-[2em]">
        <button onClick={() => setCount((count) => count + 1)} className="btn-focus cursor-pointer rounded-lg border border-solid border-transparent bg-gray-100 px-[1.2em] py-[0.6em] font-sans text-[1em] font-medium transition-[border] duration-[0.25s] hover:border-[#646cff] focus:outline focus:outline-2 focus:outline-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-400 dark:bg-gray-900">
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="text-gray-400">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
