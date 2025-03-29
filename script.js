const Gameboard = (() => {
  let gameboard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const render = () => {
    let boardHTML = "";
    gameboard.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        boardHTML += `<div id="${rowIndex}-${colIndex}" class="cell">${cell}</div>`;
      });
    });
    document.querySelector(".gameboard").innerHTML = boardHTML;
  };

  const reset = () => {
    gameboard = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    render();
  };

  const updateCell = (rowIndex, colIndex, mark) => {
    if (gameboard[rowIndex][colIndex] === "") {
      gameboard[rowIndex][colIndex] = mark;
      render();
    }
  };

  const getGameboard = () => gameboard;

  return { render, reset, updateCell, getGameboard };
})();

const createPlayer = (name, mark) => {
  return {
    name,
    mark,
  };
};

const Game = (() => {
  let players = [];
  let currentPlayerIndex;
  let gameOver;

  const start = () => {
    const player1Name = document.querySelector("#player1").value.trim();
    const player2Name = document.querySelector("#player2").value.trim();
    const messageElement = document.querySelector(".start-message");

    // Check if both player names are provided
    if (!player1Name || !player2Name) {
      messageElement.textContent = "Both players must enter their names to start the game.";
      return;
    }

    // Clear any previous message
    messageElement.textContent = "";

    players = [
      createPlayer(player1Name, "X"),
      createPlayer(player2Name, "O"),
    ];
    currentPlayerIndex = 0;
    gameOver = false;
    Gameboard.render();
  };

  const restart = () => {
    gameOver = false;
    currentPlayerIndex = 0;
    Gameboard.reset();
    document.querySelector(".start-message").textContent = ""; // Clear any message on restart
  };

  const checkWin = (mark) => {
    const board = Gameboard.getGameboard();

    for (let row of board) {
      if (row.every((cell) => cell === mark)) return true;
    }

    for (let col = 0; col < board.length; col++) {
      if (board.every((row) => row[col] === mark)) return true;
    }

    if (board.every((row, index) => row[index] === mark)) return true;
    if (board.every((row, index) => row[board.length - 1 - index] === mark)) return true;

    return false;
  };

  const handleCellClick = (event) => {
    if (gameOver) return;

    const cellId = event.target.id;
    const [rowIndex, colIndex] = cellId.split("-").map(Number);

    const currentPlayer = players[currentPlayerIndex];
    if (Gameboard.getGameboard()[rowIndex][colIndex] !== "") return; // Prevent overwriting a cell

    Gameboard.updateCell(rowIndex, colIndex, currentPlayer.mark);

    if (checkWin(currentPlayer.mark)) {
      gameOver = true;
      document.querySelector(".start-message").textContent = `${currentPlayer.name} wins!`;
      return;
    }

    const isDraw = Gameboard.getGameboard().every((row) =>
      row.every((cell) => cell !== "")
    );
    if (isDraw) {
      gameOver = true;
      document.querySelector(".start-message").textContent = "It's a draw!";
      return;
    }

    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
  };

  return { start, restart, handleCellClick };
})();

const startButton = document.querySelector(".start-game-btn");
startButton.addEventListener("click", () => {
  Game.start();
});

const restartButton = document.querySelector(".restart-game-btn");
restartButton.addEventListener("click", () => {
  Game.restart();
});

const gameboardElement = document.querySelector(".gameboard");
gameboardElement.addEventListener("click", (event) => {
  if (event.target.classList.contains("cell")) {
    Game.handleCellClick(event);
  }
});
