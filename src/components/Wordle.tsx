import { Solution } from "../App";
import UseWordle from "../hooks/useWordle";
import { useEffect } from "react";
import Grid from "./Grid";
import Keyboard from "./Keyboard";

const Wordle = (solution: Solution) => {
  const {
    currentGuess,
    handleKeyUp,
    guesses,
    history,
    isCorrect,
    turn,
    usedKeys,
  } = UseWordle(solution);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyUp]);

  useEffect(() => {
    // console.log(guesses, turn, isCorrect);
    console.log(usedKeys);
  }, [guesses, turn, isCorrect, usedKeys]);

  return (
    <>
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
      <Keyboard usedKeys={usedKeys}/>
    </>
  );
};
export default Wordle;
