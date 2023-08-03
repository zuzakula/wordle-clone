import React, { useEffect, useState } from "react";
import "./App.css";
import Wordle from "./components/Wordle";
import Keyboard from "./components/Keyboard";
import useWordle from "./hooks/useWordle";

export interface Solution {
  id: number;
  word: string;
}

function App() {
  const [solution, setSolution] = useState<Solution>();

  useEffect(() => {
    fetch("http://localhost:3001/solutions")
      .then((res) => res.json())
      .then((json) => {
        const randomSolution =
          json[Math.floor(Math.random() * json.length - 1)];
        setSolution(randomSolution.word);
      });
  }, [setSolution]);

  return (
    <>
      <div className="App">
        <h1>Wordle</h1>
        {solution && <Wordle {...solution} />}
      </div>
    </>
  );
}

export default App;
