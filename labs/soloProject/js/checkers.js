var checkers = new Vue({
  el: "#checkers",
  data: {
    gameOver: false,
    winner: 0,
    playerTurn: 1,
    pieceSelected: false,
    selectedRow: null,
    selectedCol: null,
    // hasEnemy: false,
    board: [
      [0, 3, 0, 3, 0, 3, 0, 3],
      [3, 0, 3, 0, 3, 0, 3, 0],
      [0, 3, 0, 3, 0, 3, 0, 3],
      [3, 0, 3, 0, 3, 0, 3, 0],
      [0, 3, 0, 3, 0, 3, 0, 3],
      [3, 0, 3, 0, 3, 0, 3, 0],
      [0, 3, 0, 3, 0, 3, 0, 3],
      [3, 0, 3, 0, 3, 0, 3, 0]
    ],
    lightBoardStyle: {
      backgroundColor: "#D9995E",
      color: "black",
      height: "50px",
      width: "50px"
    },
    darkBoardStyle: {
      backgroundColor: "#244423",
      color: "black",
      height: "50px",
      width: "50px"
    },
    redPlayerStyle: {
      backgroundColor: "#DE0B09"
    },
    whitePlayerStyle: {
      backgroundColor: "#FFFFFF"
    }
  },
  methods: {
    newGame: function() {
      // Set/Reset game data for a new game.
      this.gameOver = false;
      this.winner = 0;
      this.playerTurn = 1;
      this.pieceSelected = false;
      this.selectedRow = null;
      this.selectedCol = null;
      // Set/reset the board for a new game
      var newBoard = [
        [0, 2, 0, 2, 0, 2, 0, 2],
        [2, 0, 2, 0, 2, 0, 2, 0],
        [0, 2, 0, 2, 0, 2, 0, 2],
        [3, 0, 3, 0, 3, 0, 3, 0],
        [0, 3, 0, 3, 0, 3, 0, 3],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0]
      ];
      // Replace the board with the new game board.
      this.board = newBoard;
    },
    selectPiece: function(row, col, item) {
      //   console.log(row, col, item);

      // Check the selected piece to see if it belongs to the player who's turn it is. If it is: continue. Else do nothing.
      if (item == this.playerTurn) {
        // Save selected piece data to the higher scope.
        this.pieceSelected = true;
        this.selectedRow = row;
        this.selectedCol = col;
      } else {
        this.pieceSelected = false;
      }

      //   console.log("There is a selected piece? " + this.pieceSelected);
      //   console.log("Selected piece row: " + this.selectedRow);
      //   console.log("Selected piece col: " + this.selectedCol);
    },
    movePiece: function(targetRow, targetCol, targetItem) {
      //   console.log(targetRow, targetCol, targetItem);

      // If the move is valid, change the pieces location: Reset old/selected tile to empty then put player's piece in target.
      //   if (this.pieceSelected && targetItem == 3) {
      if (this.checkMoveValidity(targetRow, targetCol, targetItem)) {
        // Clone the game board.
        var tempBoard = this.board.slice(0);

        // Modify the clone.
        // Set the old/selected tile to empty
        tempBoard[this.selectedRow][this.selectedCol] = 3;
        // Put player's piece in target tile.
        tempBoard[targetRow][targetCol] = this.playerTurn;
        //remove jumped pieces

        // Replace board with clone.
        this.board = tempBoard;

        // Swap player turn.
        this.playerTurn = this.playerTurn == 1 ? 2 : 1;

        // Deselect piece.
        this.pieceSelected = false;

        // Check for a win.
        this.checkWin();
      }
    },
    checkMoveValidity: function(targetRow, targetCol, targetItem) {
      // If a piece has been selected and target is open.
      if (this.pieceSelected && targetItem == 3) {
        // If player 1 (red), else if player 2 (white)
        if (this.playerTurn == 1) {
          // Valid simple moves are one row up
          if (targetRow == this.selectedRow - 1) {
            // Valid moves are one column left/right.
            if (
              targetCol == this.selectedCol + 1 ||
              targetCol == this.selectedCol - 1
            ) {
              console.log("simple move");
              return true;
            } else {
              return false;
            }
          }
          // Valid Jumps are two rows up
          else if (targetRow == this.selectedRow - 2) {
            // Valid jump right
            if (targetCol == this.selectedCol + 2) {
              // Valid jumps have an enemy between selected and target space.
              if (this.board[targetRow + 1][targetCol - 1] == 2) {
                // Remove Jumped Piece
                this.removeJumpedPiece(targetRow + 1, targetCol - 1);
                // Return true to validate move.
                return true;
              } else {
                return false;
              }
            }
            // Valid jump left
            else if (targetCol == this.selectedCol - 2) {
              // Valid jumps have an enemy between selected and target space.
              if (this.board[targetRow + 1][targetCol + 1] == 2) {
                // Remove Jumped Piece
                this.removeJumpedPiece(targetRow + 1, targetCol + 1);
                // Return true to validate move.
                return true;
              } else {
                return false;
              }
            } else {
              return false;
            }
          }
          // No other move is a valid move
          else {
            return false;
          }
        } else if (this.playerTurn == 2) {
          // Valid simple moves are one row up
          if (targetRow == this.selectedRow + 1) {
            // Valid moves are one column left/right.
            if (
              targetCol == this.selectedCol + 1 ||
              targetCol == this.selectedCol - 1
            ) {
              console.log("simple move");
              return true;
            } else {
              return false;
            }
          }
          // Valid Jumps are two rows down
          else if (targetRow == this.selectedRow + 2) {
            // Valid jump right
            if (targetCol == this.selectedCol + 2) {
              // Valid jumps have an enemy between selected and target space.
              if (this.board[targetRow - 1][targetCol - 1] == 1) {
                // Remove Jumped Piece
                this.removeJumpedPiece(targetRow - 1, targetCol - 1);
                // Return true to validate move.
                return true;
              } else {
                return false;
              }
            }
            // Valid jump left
            else if (targetCol == this.selectedCol - 2) {
              // Valid jumps have an enemy between selected and target space.
              if (this.board[targetRow - 1][targetCol + 1] == 1) {
                // Remove Jumped Piece
                this.removeJumpedPiece(targetRow - 1, targetCol + 1);
                // Return true to validate move.
                return true;
              } else {
                return false;
              }
            } else {
              return false;
            }
          }
          // No other move is a valid move
          else {
            return false;
          }
        }
      } else {
        return false;
      }
    },
    removeJumpedPiece: function(jumpedPieceRow, jumpedPieceCol) {
      // Clone the game board.
      var jumpedBoard = this.board.slice(0);

      // Modify the clone.
      // Set jumped piece to 3 == empty space.
      jumpedBoard[jumpedPieceRow][jumpedPieceCol] = 3;

      // Replace board with clone.
      this.board = jumpedBoard;
    },
    // check4Moves: function(){
    //     switch(this.playerTurn){
    //         case 1:
    //             for (row in this.board){
    //                 for(item in row){
    //                     if (item == 1){
    //                         //Check for moves
    //                         if (this.board[])
    //                     }
    //                 }
    //             }
    //             break;
    //         case 2:
    //             break;
    //     }
    // },
    checkWin: function() {
      //Checks if the game has a winner.
      // Game over if a player loses all their pieces.
      // Game over if a player has no more moves.
    }
  }
});
