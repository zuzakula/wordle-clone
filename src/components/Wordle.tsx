import { Solution } from "../App";
import UseWordle from "../hooks/useWordle";
import { useEffect } from "react";

const Wordle = (solution: Solution) => {
  const { currentGuess, handleKeyUp, guesses, history, isCorrect, turn } =
    UseWordle(solution);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyUp]);

  useEffect(() => {
    console.log(guesses, turn, isCorrect);
  }, [guesses, turn, isCorrect]);

  return <div>{currentGuess}</div>;
};
export default Wordle;
