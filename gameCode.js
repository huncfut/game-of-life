// Setting up some basic vars
refreshRate = 1000
genChance = [4, 1]
height = 632
width = 1024
canvas = document.getElementById("gameCan")
ctx = canvas.getContext("2d")
gameImageData = ctx.createImageData(width, height)
gameBoard = []


function generateRandomBoard() {
  for(i = 0; i < gameImageData.data.length / 4; i++) {
    if(Math.floor(Math.random() * genChance[0]) < genChance[1]) {
      gameBoard.push(1)
    } else {
      gameBoard.push(0)
    }
  }
}

function check(board, index) {
  x = 0
  if(index > width)                       {x += board[index - (width + 1)]}
  if(index > width - 1)                   {x += board[index - width]}
  if(index > width - 2)                   {x += board[index - (width - 1)]}
  if(index > 0)                           {x += board[index - 1]}
  if(index < width * height)              {x += board[index + 1]}
  if(index < width * height - width + 1)  {x += board[index + width - 1]}
  if(index < width * height - width)      {x += board[index + width]}
  if(index < width * height - width - 1)  {x += board[index + width + 1]}
  return x
}

function newGeneration(imgData, board) {
  newBoard = []
  for(i = 0; i < board.length; i++) {
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
  setTimeout(newGeneration, refreshRate, imgData, newBoard)
}

generateRandomBoard()

newGeneration(gameImageData, gameBoard)
