import { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import GridColumn from "./GridColumn";

function App() {
  const [grid, setGrid] = useState([]);
  const [playerOneTurn, setPlayerOneTurn] = useState(true);
  const [gameActive, setGameActive] = useState(true);
  const [gameWinner, setGameWinner] = useState(null);

  console.log(grid);

  // Generate a grid 7x7 of empty arrays
  function createGrid() {
    let grid = [];
    const GRID_COUNT = 7;

    for (let i = 0; i < GRID_COUNT; i++) {
      let column = Array(GRID_COUNT).fill(0);
      grid.push(column);
    }
    setGrid(grid);
  }

  useEffect(() => {
    createGrid();
  }, []);

  function changeTurns() {
    setPlayerOneTurn(!playerOneTurn);
  }

  function handlePlaceToken(col) {
    // If game is active, set token
    if (gameActive) {
      const gridArray = [...grid];
      let playerValue = "";
      // console.log("copy: ", gridArray);
      if (playerOneTurn) {
        playerValue = "1";
      } else {
        playerValue = "2";
      }

      let selectedIndex;

      for (let row = 0; row <= grid.length - 1; row++) {
        if (gridArray[col][row] === 0) {
          // gridArray[col][i] = playerTurn;
          selectedIndex = row;
          break;
        }
      }

      // Check if selected index exist
      if (typeof selectedIndex === "number") {
        gridArray[col][selectedIndex] = playerValue;
        setGrid(gridArray);

        // Check winner
        checkColumnMatch(col, playerValue);
        checkRowMatch(selectedIndex, playerValue); //Pass in row

        checkDiagonalRightMatch(playerValue);
        checkDiagonalLeftMatch(playerValue);
        // Change turns
        changeTurns();
      }
    }
  }

  // Check winning conditions
  // column win = 4 consecutive blocks in the same column
  function checkColumnMatch(col, player) {
    for (let row = 0; row <= grid.length - 4; row++) {
      if (
        grid[col][row] === player &&
        grid[col][row + 1] === player &&
        grid[col][row + 2] === player &&
        grid[col][row + 3] === player
      ) {
        setGameWinner(player);
        setGameActive(false);
        break;
      }
    }
  }

  function checkRowMatch(row, player) {
    for (let col = 0; col <= grid.length - 4; col++) {
      //-4 to counteract the >6 index barrier

      if (
        grid[col][row] === player &&
        grid[col + 1][row] === player &&
        grid[col + 2][row] === player &&
        grid[col + 3][row] === player
      ) {
        setGameWinner(player);
        setGameActive(false);
        break;
      }
    }
  }

  function checkDiagonalRightMatch(player) {
    // loop through the column until 4 blocks smaller than the roof
    for (let col = 0; col <= grid.length - 4; col++) {
      // Loop through the rows in each column until 4 smaller than the roof
      for (let row = 0; row <= grid.length - 4; row++) {
        // Check for diagonal right
        if (
          grid[col][row] === player &&
          grid[col + 1][row + 1] === player &&
          grid[col + 2][row + 2] === player &&
          grid[col + 3][row + 3] === player
        ) {
          setGameWinner(player);
          setGameActive(false);
          break;
        }
      }
    }
  }

  function checkDiagonalLeftMatch(player) {
    for (let col = grid.length - 1; col >= grid.length - 4; col--) {
      // Loop through the rows in each column until 4 smaller than the roof
      for (let row = 0; row <= grid.length - 4; row++) {
        if (
          grid[col][row] === player &&
          grid[col - 1][row + 1] === player &&
          grid[col - 2][row + 2] === player &&
          grid[col - 3][row + 3] === player
        ) {
          setGameWinner(player);
          setGameActive(false);
          break;
        }
      }
    }
  }

  return (
    <div className="App">
      <Header
        playerOneTurn={playerOneTurn}
        gameActive={gameActive}
        gameWinner={gameWinner}
      />
      <div className="grid-container">
        {grid.map((column, c) => (
          <GridColumn
            column={column}
            handlePlaceToken={handlePlaceToken}
            grid={grid}
            columnKey={c}
            key={c}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
