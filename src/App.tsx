import { useEffect, useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState(
    JSON.parse(localStorage.getItem("isOpen") || "false")
  );

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    localStorage.setItem("isOpen", JSON.stringify(isOpen));
  }, [isOpen]);

  return (
    <div>
      <h1 className="text-[3.2em] leading-[1.1] text-center">
        Browser Storage
      </h1>
      <button
        onClick={handleClick}
        className="btn-focus cursor-pointer rounded-lg border border-solid border-transparent bg-gray-100 px-[1.2em] py-[0.6em] font-sans text-[1em] font-medium tracking-widest transition-[border] duration-[0.25s] hover:border-[#646cff] focus:outline focus:outline-2 focus:outline-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-400 dark:bg-gray-900"
      >
        Toggle
      </button>
      <hr />
      {isOpen && (
        <p className="text-gray-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic iure
          ullam quam quas explicabo. Minima veniam quasi quidem numquam iusto
          praesentium totam consectetur, dolore laboriosam alias. Esse doloribus
          modi eius.
        </p>
      )}
    </div>
  );
}

export default App;
