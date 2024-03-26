import React, { useState } from 'react';
import stoneImage from '../images/stone.png';
import paperImage from '../images/paper.jpg';
import scissorsImage from '../images/seccors.jpg';
import {Link} from 'react-router-dom'

const Game = () => {
  const [round, setRound] = useState(1);
  const [player1Choice, setPlayer1Choice] = useState('');
  const [player2Choice, setPlayer2Choice] = useState('');
  const [score, setScore] = useState({ player1: 0, player2: 0 });
  const [showResult, setShowResult] = useState(false);
  const [showPlayer1Options, setShowPlayer1Options] = useState(true);
  const [showPlayer2Options, setShowPlayer2Options] = useState(false);

  const choices = ['stone', 'paper', 'scissors'];
  const choiceImages = {
    stone: stoneImage,
    paper: paperImage,
    scissors: scissorsImage,
  };

  const determineWinner = (choice1, choice2) => {
    if (choice1 === choice2) {
      return 'Tie';
    } else if (
      (choice1 === 'stone' && choice2 === 'scissors') ||
      (choice1 === 'scissors' && choice2 === 'paper') ||
      (choice1 === 'paper' && choice2 === 'stone')
    ) {
      return 'Player 1';
    } else {
      return 'Player 2';
    }
  };

  const playRound = () => {
    const winner = determineWinner(player1Choice, player2Choice);
    if (winner === 'Player 1') {
      setScore((prevScore) => ({ ...prevScore, player1: prevScore.player1 + 1 }));
    } else if (winner === 'Player 2') {
      setScore((prevScore) => ({ ...prevScore, player2: prevScore.player2 + 1 }));
    }
    setShowResult(true);
  };

  const handlePlayer1Choice = (choice) => {
    setPlayer1Choice(choice);
    setShowPlayer1Options(false); // Hide Player 1 options after selection
    setShowPlayer2Options(true); // Show Player 2 options after Player 1 selects
  };

  const handlePlayer2Choice = (choice) => {
    setPlayer2Choice(choice);
    playRound();
  };

  const resetGame = () => {
    setPlayer1Choice('');
    setPlayer2Choice('');
    setShowResult(false);
    setShowPlayer1Options(true); // Reset to show Player 1 options
    setShowPlayer2Options(false);
    setRound(round + 1);
  };

  return (
    <div>
      {showResult ? (
        <div style={{textAlign:'center'}}>
          <h1>Round {round} Result</h1>
          <h2>Player 1: {player1Choice}</h2>
          <h2>Player 2: {player2Choice}</h2>
          <h2>Winner: {determineWinner(player1Choice, player2Choice)}</h2>
          <button onClick={resetGame} style={{fontSize:"inherit"  , padding:'1.3%' , borderRadius:'10px', backgroundColor:"lightgray",  color:'black' ,marginRight:'20px' , border:"none"}}>Next Round</button>

          <Link to='/results' style={{fontSize:"inherit"  , padding:'1%' , borderRadius:'10px', backgroundColor:"lightgray",  color:'black',}}>Show Results</Link>
        </div>
      ) : (
        <div>
          <h1 style={{textAlign:'center'}}>Round {round}</h1>
          {showPlayer1Options && (
            <div>
              <h3 style={{textAlign:'center'}}>Player 1:</h3>
              {choices.map((choice) => (
                <img
                  key={choice}
                  src={choiceImages[choice]} // Use image variable instead of path
                  alt={choice}
                  onClick={() => handlePlayer1Choice(choice)}
                  style={{ cursor: 'pointer', marginRight: '10px', width:'300px' ,     height:'300px' ,padding:'5%' , border:'3px solid black'}}
                />
              ))}
            </div>
          )}
          {showPlayer2Options && (
            <div>
              <h2 style={{textAlign:'center' ,fontSize:"2rem"}}  >Player 2:</h2>
              {choices.map((choice) => (
                <img
                  key={choice}
                  src={choiceImages[choice]} // Use image variable instead of path
                  alt={choice}
                  onClick={() => handlePlayer2Choice(choice)}
                  style={{ cursor: 'pointer', marginRight: '10px' , width:'300px' ,     height:'300px' , padding:'5%'  , border:'3px solid black'}}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Game;
