import React, { useState } from "react";
import MemoryGame from "./MemoryGame";
import StartScreen from "./StartScreen";
import Countdown from "./Countdown";
import "./App.css";

const App = () => {
    const [gameStarted, setGameStarted] = useState(false);
    const [countStarted, setCountStarted] = useState(false);

    const [countDown, setCountDown] = useState(3);

    return (
        <main className="App">
            <h1>Memory Game</h1>
            {gameStarted && <MemoryGame numPairs={3} />}

            {!gameStarted && !countStarted && (
                <StartScreen isStart={() => setCountStarted(true)} />
            )}

            {!gameStarted && countStarted && (
                <Countdown
                    countDown={countDown}
                    countFinished={() => setGameStarted(true)}
                />
            )}
        </main>
    );
};

export default App;
