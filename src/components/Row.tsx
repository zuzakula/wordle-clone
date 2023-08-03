const Row = ({ guess, currentGuess }: any) => {
  if (guess) {
    return (
      <div className="row past">
        {guess.map((letter: any, index: any) => (
          <div key={index} className={letter.color}>
            {letter.key}
          </div>
        ))}
      </div>
    );
  } else if (currentGuess) {
    let letters = currentGuess.split("");
    return (
      <div className="row current">
        {letters.map((letter: any, index: any) => (
          <div key={index} className="filled">
            {letter}
          </div>
        ))}
        {[...Array(5 - letters.length)].map((val, index) => (
          <div key={index}></div>
        ))}
      </div>
    );
  }

  return (
    <div className="row">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Row;
