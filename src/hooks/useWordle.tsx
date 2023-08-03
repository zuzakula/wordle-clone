import { Solution } from "../App";
import { useState } from "react";

const useWordle = (solution: Solution) => {
  const [guesses, setGuesses] = useState([...Array(6)]);
  const [history, setHistory] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [usedKeys, setUsedKeys] = useState({})

  const formatGuess = () => {
    let solutionObj = { ...solution };
    let solutionArr = Object.values(solutionObj);
    let formattedGuess = currentGuess.split("").map((letter) => {
      return { key: letter, color: "grey" };
    });

    // turn to green
    formattedGuess.forEach((letter, index) => {
      if (solutionArr[index] === letter.key) {
        letter.color = "green";
      }
    });

    // turn to yellow
    formattedGuess.forEach((letter) => {
      if (solutionArr.includes(letter.key) && letter.color !== "green") {
        letter.color = "yellow";
      }
    });

    return formattedGuess;
  };

  const newGuess = (formattedGuess: { key: string; color: string }[]) => {
    currentGuess === solution.word ? setIsCorrect(true) : setIsCorrect(false);
    console.log(isCorrect)

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

    setUsedKeys((prev) => {
      const newKeys: any = {...prev}

      formattedGuess.forEach(letter => {
        const currColor = newKeys[letter.key]

        if(letter.color === "green"){
          newKeys[letter.key] = "green"
          return
        }

        if(letter.color === "yellow" && currColor !== "green"){
          newKeys[letter.key] = "yellow"
          return
        }

        if(letter.color === "grey" && currColor !== "green"){
          newKeys[letter.key] = "dark-grey"
          return
        }
      })

      return newKeys;
    })

    setCurrentGuess("");
  };

  const handleKeyUp = ({ key }: any) => {
    if (key === "Enter") {
      if (turn < 6) {
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

  return { turn, currentGuess, guesses, isCorrect, history, handleKeyUp, usedKeys };
};

export default useWordle;
