var checkers = new Vue({
  el: "#checkers",
  data: {
    gameOver: false,
    winner: 0,
    playerTurn: 1,
    board: [
      [0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0]
    ],
    lightBoardStyle: {
      backgroundColor: "burlywood",
      color: "burlywood"
    },
    darkBoardStyle: {
      backgroundColor: "sienna",
      color: "sienna"
    },
    redPlayerStyle: {},
    blackPlayerStyle: {}
  },
  methods: {}
});
