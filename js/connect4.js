import {BOARD_COLUMNS, BOARD_ROWS} from './Board.js';

// Dimensions of the board
const DISC_R = 50;
const HOLE_SPACE_X = 30;
const HOLE_SPACE_Y = 15;
const BOARD_START_X = 50;
const BOARD_START_Y = 50;


var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// X coordinate of the center of the disc
function xCoord(column) {
  return BOARD_START_X + (column + 1) * HOLE_SPACE_X + column * 2 * DISC_R + DISC_R;
}

// Y coordinate of the center of the disc
function yCoord(row) {
  return BOARD_START_Y + (row + 1) * HOLE_SPACE_Y + row * 2 * DISC_R + DISC_R;
}

// Column given X coordinate
function colFromX(x) {
  var fCol = (x - BOARD_START_X - HOLE_SPACE_X / 2) / (2 * DISC_R + HOLE_SPACE_X);
  return fCol < 0 || fCol >= BOARD_COLUMNS ? -1 : Math.trunc(fCol);
}

function drawBackground() {
  ctx.fillStyle = 'grey';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawBoard() {
  ctx.fillStyle = 'blue';
  ctx.fillRect(
    BOARD_START_X + HOLE_SPACE_X / 2, 
    BOARD_START_Y,
    BOARD_COLUMNS * 2 * DISC_R + BOARD_COLUMNS * HOLE_SPACE_X, 
    BOARD_ROWS * 2 * DISC_R + (BOARD_ROWS + 1) * HOLE_SPACE_Y,
  );

  for (var r = 0; r < BOARD_ROWS; r++) {
    for (var c = 0; c < BOARD_COLUMNS; c++) {
      ctx.beginPath();
      ctx.arc(
        xCoord(c),
        yCoord(r),
        DISC_R,       // radius
        0,            // start angle
        2 * Math.PI,  // end angle
      );
      ctx.fillStyle = 'white';
      ctx.fill();
    }
  }
}

function redraw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();
  drawBoard();
}

function onMouseUpdate(e) {
  redraw();
  var x = e.x;
  var y = e.y;

  var col = colFromX(x);
  if (col == -1) {
    return;
  }
  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.strokeStyle = 'red';
  ctx.rect(
    xCoord(col) - DISC_R - HOLE_SPACE_X / 2, 
    BOARD_START_Y,
    2 * DISC_R + HOLE_SPACE_X, 
    BOARD_ROWS * 2 * DISC_R + (BOARD_ROWS + 1) * HOLE_SPACE_Y,
  );
  ctx.stroke();
}

function onMouseClick(e) {
  // console.log(e);
  var col = colFromX(e.x);
  console.log(col);
}

document.addEventListener('mousemove', onMouseUpdate);
document.addEventListener('click', onMouseClick);

redraw();