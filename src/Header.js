import React from "react";

function Header({ playerOneTurn, gameActive, gameWinner }) {
  // const [gameStatus, setGameStatus] = useState('')

  let player, msg;

  if (gameActive) {
    player = playerOneTurn ? "1" : "2";

    msg = (
      <h3>
        <span style={{ color: playerOneTurn ? "green" : "blue" }}>
          Player {player}'s
        </span>{" "}
        turn!{" "}
      </h3>
    );
  } else {
    msg = <h3>Player {gameWinner} is the winner!</h3>;
  }

  return (
    <div>
      <h1>Connect4</h1>
      {msg}
    </div>
  );
}

export default Header;
