import { Solution } from "../App";
import { useState } from "react";

enum color {
  grey,
  yellow,
  green,
}

const useWordle = (solution: Solution) => {
  const [guesses, setGuesses] = useState([...Array(6)]);
  const [history, setHistory] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");

  const formatGuess = () => {
    let solutionObj = { ...solution };
    let solutionArr = Object.values(solutionObj);
    let formattedGuess = currentGuess.split("").map((letter) => {
      return { key: letter, color: color.grey };
    });

    // turn to green
    formattedGuess.forEach((letter, index) => {
      if (solutionArr[index] === letter.key) {
        letter.color = color.green;
      }
    });

    // turn to yellow
    formattedGuess.forEach((letter) => {
      if (solutionArr.includes(letter.key) && letter.color !== color.green) {
        letter.color = color.yellow;
      }
    });

    return formattedGuess;
  };

  const newGuess = (formattedGuess: { key: string; color: color }[]) => {
    currentGuess === solution.word ? setIsCorrect(true) : setIsCorrect(false);

    setGuesses((prev) => {
      let newGuesses = [...prev];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });

    setHistory((prev) => {
      return [...prev, currentGuess];
    });

    setTurn((prev) => {
      return prev + 1;
    });

    setCurrentGuess("");
  };

  const handleKeyUp = ({ key }: any) => {
    if (key === "Enter") {
      if (turn < 5) {
        if (currentGuess.length === 5) {
          if (!history.includes(currentGuess)) {
            const formatedGuess = formatGuess();
            newGuess(formatedGuess);
          } else {
            console.log("Duplicated word");
          }
        } else {
          console.log("Too long word");
        }
      } else {
        console.log("All guesses used");
      }
    }
    if (key === "Backspace") {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1);
      });
    }
    if (/^[a-zA-Z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => {
          return prev + key;
        });
      } else if (currentGuess.length === 5) {
        // setCurrentGuess("");
      }
    }
  };

  return { turn, currentGuess, guesses, isCorrect, history, handleKeyUp };
};

export default useWordle;
