window.Game = function(){
    this.board = new Array(6).fill(0).map(function(row){ return new Array(7).fill(null)})
    this.players = ["red", "black"]
    this.currentPlayer = "red"
  }
  Game.prototype.placePiece = function(column) {
    if(this.board[0][column]!== null) {
      return false
    }
    for(var row = 0; row < this.board.length; row ++) {
      if(row == 5 || this.board[row + 1][column] !== null) {
        this.board[row][column] = this.currentPlayer
        this.switchPlayers()
        return true
      }
    }
  }
  Game.prototype.switchPlayers = function() {
    if(this.currentPlayer === "red"){
      this.currentPlayer = "black"
    } else {
      this.currentPlayer = "red"
    }
  }

  Game.prototype.winner = function() {
    var self = this;
    var winner = false;
    //check horizontal for four in a row
    self.board.forEach(function(row){
      if(self.hasConnectFour(row)) {
        winner = self.hasConnectFour(row)
      }
    })
    //check vertically for four in row

    var transposedBoard = self.board[0].map(function(col, i) {
        return self.board.map(function(row) {
          return row[i];
        })
      });
    transposedBoard.forEach(function(row){
      if(self.hasConnectFour(row)) {
        winner = self.hasConnectFour(row)
      }
    })



    //check left diagonals for four in row.
    var leftDiagBoardObject = {}
    for(var rowIndex = 0; rowIndex < self.board.length; rowIndex ++) {
      for (var colIndex = 0; colIndex < self.board[0].length; colIndex ++) {
        leftDiagBoardObject[rowIndex - colIndex] = leftDiagBoardObject[rowIndex - colIndex] || []
        leftDiagBoardObject[rowIndex - colIndex].push(self.board[rowIndex][colIndex])
      }
    }
    var leftDiagBoardList = []
    for (var key in leftDiagBoardObject) {
      leftDiagBoardList.push(leftDiagBoardObject[key]);
    }

    leftDiagBoardList.forEach(function(row){
      if(self.hasConnectFour(row)) {
        winner = self.hasConnectFour(row)
      }
    })

    //check right diagonals for four in row.
    var rightDiagBoardObject = {}
    for(var rowIndex = 0; rowIndex < self.board.length; rowIndex ++) {
      for (var colIndex = 0; colIndex < self.board[0].length; colIndex ++) {
        rightDiagBoardObject[rowIndex + colIndex] = rightDiagBoardObject[rowIndex + colIndex] || []
        rightDiagBoardObject[rowIndex + colIndex].push(self.board[rowIndex][colIndex])
      }
    }
    var rightDiagBoardList = []
    for (var key in rightDiagBoardObject) {
      rightDiagBoardList.push(rightDiagBoardObject[key]);
    }

    rightDiagBoardList.forEach(function(row){
      if(self.hasConnectFour(row)) {
        winner = self.hasConnectFour(row)
      }
    })
    return winner
  }
  Game.prototype.hasConnectFour = function(list) {
    for(var i = 0; (i + 3) < list.length; i ++) {
      var redWins = list.slice(i, i+4).every(function(square){
        return square === "red"
      })
      var blackWins = list.slice(i, i+4).every(function(square){
        return square === "black"
      })
      if (redWins) {
        return "red"
      }else if(blackWins) {
        return "black"
      }
    }
    return false
  }



