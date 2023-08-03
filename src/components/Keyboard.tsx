import { useEffect, useState } from "react";
import useWordle from "../hooks/useWordle";

const alphabet: any = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const Keyboard = (usedKeys: any) => {
  const [letters, setLetters] = useState<any>(null);

  useEffect(() => {
    const letters = alphabet.map((letter: any) => {
      return {  [letter]: "grey" };
    });

    if (letters) {
      setLetters(letters);
    }
  }, []);

  return (
    <div className="keyboard">
      {letters &&
        alphabet.map((letter: any) => {
          const color = usedKeys.usedKeys[`${letter.toLowerCase()}`];
          return (
            <div key={letter} className={color} >
              {letter}
            </div>
          );
        })}
    </div>
  );
};

export default Keyboard;
