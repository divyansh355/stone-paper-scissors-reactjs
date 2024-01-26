import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import './App.css'

function App() {
  const paper = "https://iili.io/JcoUtBR.png";
  const rock = "https://iili.io/JcoULhJ.png";
  const scissor = "https://iili.io/JcoUQLv.png"

  const [userScore, setUserScore] = useState(0);
  const [compScore, setCompScore] = useState(0);

  const choices = ["rock", "paper", "scissors"];

  const genCompChoice = () => {
    const randIdx = Math.floor(Math.random() * 3);
    return choices[randIdx];
  };

  const drawGame = () => {
    setMsg("Game was Draw. Play again.");
  };

  const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
      setUserScore(userScore + 1);
      setMsg(`You win! Your ${userChoice} beats ${compChoice}`);
      setMsgColor("green");
    } else {
      setCompScore(compScore + 1);
      setMsg(`You lost. ${compChoice} beats your ${userChoice}`);
      setMsgColor("red");
    }
  };

  const playGame = (userChoice) => {
    const compChoice = genCompChoice();

    if (userChoice === compChoice) {
      drawGame();
    } else {
      let userWin = true;
      if (userChoice === "rock") {
        userWin = compChoice === "paper" ? false : true;
      } else if (userChoice === "paper") {
        userWin = compChoice === "scissors" ? false : true;
      } else {
        userWin = compChoice === "rock" ? false : true;
      }
      showWinner(userWin, userChoice, compChoice);
    }
  };

  const [msg, setMsg] = useState("");
  const [msgColor, setMsgColor] = useState("");

  useEffect(() => {
    document.querySelectorAll(".choice").forEach((choice) => {
      choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
      });
    });
  });

  return (
    <>
      <h1>Rock Paper Scissors</h1>
      <div className="choices">
        <div className="choice" id="rock">
          <img src={rock} />
        </div>
        <div className="choice" id="paper">
          <img src={paper} />
        </div>
        <div className="choice" id="scissors">
          <img src={scissor} />
        </div>
      </div>
      <div className="score-board">
        <div className="score">
          <p id="user-score">{userScore}</p>
          <p>You</p>
        </div>
        <div className="score">
          <p id="comp-score">{compScore}</p>
          <p>Comp</p>
        </div>
      </div>
      <div className="msg-container">
          <Alert className="msg" variant={msgColor}>{msg}</Alert>
      </div>
      
    </>
  )
}

export default App
