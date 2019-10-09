var app = new Vue({
  el: "#app",
  data: {
    gameOver: false,
    winner: 0,
    playerTurn: 1,
    grid: [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0]
    ]
  },
  methods: {
    selectCell: function(row, col) {
      // get the row to place the puck at
      var moveRow = this.lowestMove(col);

      if (moveRow >= 0) {
        //copy grid to a temporary var
        var tempGrid = this.grid.slice(0);

        //modify the cloned version
        tempGrid[moveRow][col] = this.playerTurn;

        //replace
        this.grid = tempGrid;

        //swap player turn
        this.playerTurn = this.playerTurn == 1 ? 2 : 1;

        //check for win
        this.checkWin();
      }
    },
    checkWin: function() {
      //loop through all columns to check
      //if win found, set over to true

      // Horizontal Win Condition
      for (var row = 0; row < 6; row++) {
        for (var col = 0; col < 4; col++) {
          if (
            this.checkWinLine(
              this.grid[row][col],
              this.grid[row][col + 1],
              this.grid[row][col + 2],
              this.grid[row][col + 3]
            )
          ) {
            this.gameOver = true;
            this.winner = this.grid[row][col];
          }
        }
      }
      // Vertical Win Condition
      for (var row = 0; row < 3; row++) {
        for (var col = 0; col < 7; col++) {
          if (
            this.checkWinLine(
              this.grid[row][col],
              this.grid[row + 1][col],
              this.grid[row + 2][col],
              this.grid[row + 3][col]
            )
          ) {
            this.gameOver = true;
            this.winner = this.grid[row][col];
          }
        }
      }

      // Diagonal (down to the right) Win Condition
      for (var row = 0; row < 3; row++) {
        for (var col = 0; col < 4; col++) {
          if (
            this.checkWinLine(
              this.grid[row][col],
              this.grid[row + 1][col + 1],
              this.grid[row + 2][col + 2],
              this.grid[row + 3][col + 3]
            )
          ) {
            this.gameOver = true;
            this.winner = this.grid[row][col];
          }
        }
      }
      // Diagonal (down to the left) Win Condition
      for (var row = 3; row < 6; row++) {
        for (var col = 0; col < 4; col++) {
          if (
            this.checkWinLine(
              this.grid[row][col],
              this.grid[row - 1][col + 1],
              this.grid[row - 2][col + 2],
              this.grid[row - 3][col + 3]
            )
          ) {
            this.gameOver = true;
            this.winner = this.grid[row][col];
          }
        }
      }
    },
    checkWinLine: function(a, b, c, d) {
      // TRUE if all 4 match.
      return a != 0 && a == b && a == c && a == d;
    },
    lowestMove: function(col) {
      //start at the bottom of a col, loop upwards
      for (var row = 5; row >= 0; row--) {
        //check to see if current row is free
        if (this.grid[row][col] == 0) {
          //if it is free, return the row index
          return row;
        }
      }
    }
  }
});
