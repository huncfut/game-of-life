var canvas = document.getElementById("gameCan")
var ctx = canvas.getContext("2d")
var gameImageData = ctx.createImageData(1024, 632)
var gameBoard = []

for(i = 0; i < gameImageData.data.length / 4; i++) {
  if(Math.floor(Math.random() * 4) < 1) {
    gameBoard.push(1)
  } else {
    gameBoard.push(0)
  }
}
for(i = 0; i < gameImageData.data.length / 4; i++) {
  gameImageData.data[(i * 4) + 3] = 255 * gameBoard[i]
}

function check(board, index) {
  x = 0
  if(index > 1024) {x += board[index - 1025]}
  if(index > 1023) {x += board[index - 1024]}
  if(index > 1022) {x += board[index - 1023]}
  if(index > 0) {x += board[index - 1]}
  if(index < 647168) {x += board[index + 1]}
  if(index < 646145) {x += board[index + 1023]}
  if(index < 646144) {x += board[index + 1024]}
  if(index < 646143) {x += board[index + 1025]}
  return x
}

function newGeneration(imgData, board) {
  var newBoard = []

  for(i = 0, i < board.length, i++) {
  // for(pixel in board) {
    if(board[i]) {
      if(check(board, i) > 3 || check(board, i) < 2) {
        newBoard.push(0)
      } else {
        newBoard.push(1)
      }
    } else {
      if(check(board, i) == 3) {
        newBoard.push(1)
      } else {
        newBoard.push(0)
      }
    }
  }

  for(i = 0; i < imgData.data.length / 4; i++) {
    imgData.data[(i * 4) + 3] = 255 * board[i]
  }

  ctx.putImageData(imgData, 0, 0)

  setTimeout(newGeneration(gameImageData, newBoard), 1000)
}
console.log(check(gameBoard, 647168))
newGeneration(gameImageData, gameBoard)
