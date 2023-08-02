import Row from './Row'

const Grid = ({currentGuess, guesses, turn}: any) => {
    return(
        <div>
            {guesses.map((guess: any, index: any) => {
                if(turn === index) {
                    return <Row key={index} currentGuess={currentGuess}/>
                }
                return <Row key={index} guess={guess} />
            })}
        </div>
    )

};

export default Grid;
