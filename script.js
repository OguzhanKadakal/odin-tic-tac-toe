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

  return { render, reset, updateCell };
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
    players = [
      createPlayer(document.querySelector("#player1").value, "X"),
      createPlayer(document.querySelector("#player2").value, "O"),
    ];
    currentPlayerIndex = 0;
    gameOver = false;
    Gameboard.render();
  };

  const restart = () => {
    gameOver = false;
    currentPlayerIndex = 0;
    Gameboard.reset();
  };

  const handleCellClick = (event) => {
    if (gameOver) return;

    const cellId = event.target.id; 
    const [rowIndex, colIndex] = cellId.split("-").map(Number);

    const currentPlayer = players[currentPlayerIndex];
    Gameboard.updateCell(rowIndex, colIndex, currentPlayer.mark);

    
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
