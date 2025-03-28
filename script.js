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
  return {render};
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
    return  {start};
})();

const startButton = document.querySelector(".start-game-btn");
startButton.addEventListener("click", () => {
  Game.start();
});
