const canvas = document.getElementById('game-screen')
const pointCounter = document.querySelector('#point-counter p')
const ctx = canvas.getContext('2d')
const width = canvas.width
const height = canvas.height
let runGame = true
let points = 0
let px = 0
let py = 0
let ax = setApplePos()
let ay = setApplePos()
let playerEatTheApple = false
const move = {
  up: 38,
  down: 40,
  left: 37,
  right: 39
}

/* Configurações do jogo */
function moviment (event) {
  switch (event.keyCode) {
    case move.up:
      py <= 0 ? py = 390 : py -= 10
      break
    case move.down:
      py >= 390 ? py = 0 : py += 10
      break
    case move.right:
      px >= 390 ? px = 0 : px += 10
      break
    case move.left:
      px <= 0 ? px = 390 : px -= 10
  }
}

function setApplePos () {
  const randomNum = Math.floor(Math.random() * 390)
  const position = randomNum - (randomNum % 10)

  return position
}

function setPoints () {
  points += 1
  pointCounter.innerText = points
}

function closeGame () {
  runGame = false
  pointCounter.style.color = 'red'
}

function gameComponents () {
  drawBackground()
  drawPlayer()
  drawApple()
}

function startGame () {
  playerEatTheApple = (ax === px && ay === py)

  if (runGame === true) {
    gameComponents()

    if (playerEatTheApple) {
      ax = ay = setApplePos()
      setPoints()
    }
  }
}

function gameLoop () {
  startGame()
  if (points === 7) {
    closeGame()
    drawMsg()
  }
}

/* Desenhos do jogo */

function drawBackground () {
  ctx.fillStyle = '#181818'
  ctx.fillRect(0, 0, width, height)
}

function drawPlayer () {
  ctx.fillStyle = 'white'
  ctx.fillRect(px, py, 10, 10)
}

function drawApple () {
  ctx.fillStyle = 'red'
  ctx.fillRect(ax, ay, 10, 10)
}

/* Desenhos da imagem */
function drawHeart () {
  ctx.fillRect(0, 0, 400, 400)
  const w = 200; const h = 200
  ctx.strokeStyle = '#000000'
  ctx.strokeWeight = 3
  ctx.shadowOffsetX = 4.0
  ctx.shadowOffsetY = 4.0
  ctx.lineWidth = 10.0
  ctx.fillStyle = '#FF0000'
  const d = Math.min(w, h)
  const k = 100
  ctx.moveTo(k, k + d / 4)
  ctx.quadraticCurveTo(k, k, k + d / 4, k)
  ctx.quadraticCurveTo(k + d / 2, k, k + d / 2, k + d / 4)
  ctx.quadraticCurveTo(k + d / 2, k, k + d * 3 / 4, k)
  ctx.quadraticCurveTo(k + d, k, k + d, k + d / 4)
  ctx.quadraticCurveTo(k + d, k + d / 2, k + d * 3 / 4, k + d * 3 / 4)
  ctx.lineTo(k + d / 2, k + d)
  ctx.lineTo(k + d / 4, k + d * 3 / 4)
  ctx.quadraticCurveTo(k, k + d / 2, k, k + d / 4)
  ctx.stroke()
  ctx.fill()
}

function drawHeaderText () {
  ctx.font = '25px Times'
  ctx.fillStyle = '#ffc2ab'
  ctx.textAlign = 'center'
  ctx.fillText('Cada cubo vermelho que você pegou', 200, 50)
  ctx.fillText('representa um ano de nossa história', 200, 80)
}

function drawHeartText () {
  ctx.font = '25px Times'
  ctx.fillStyle = 'white'
  ctx.textAlign = 'center'
  ctx.fillText('Todo seu,', 200, 180)
  ctx.fillText('Aninha', 200, 210)
}

function drawFooterText () {
  ctx.font = '600 35px Times'
  ctx.fillStyle = '#ffc2ab'
  ctx.textAlign = 'center'
  ctx.fillText('Feliz Dia dos Namorados', 200, 360)
}

function drawMsg () {
  drawBackground()
  drawHeart()
  drawHeaderText()
  drawFooterText()
  drawHeartText()
}

window.addEventListener('keydown', moviment, true)
setInterval(gameLoop, 60)
