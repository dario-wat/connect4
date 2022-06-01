import {BOARD_COLUMNS, BOARD_ROWS, DISC_EMPTY, DISC_RED, DISC_YELLOW} from './Board.js';
import {RESULT_RED_WINS, RESULT_YELLOW_WINS, RESULT_DRAW, RESULT_RED_PLAYS, RESULT_YELLOW_PLAYS} from './Board.js';

// Dimensions of the board
const DISC_R = 50;
const HOLE_SPACE_X = 30;
const HOLE_SPACE_Y = 15;
const BOARD_START_X = 50;
const BOARD_START_Y = 50;
const RESULT_TEXT_OFFSET_X = 40;
const RESULT_TEXT_OFFSET_Y = 40;

// Derived consts
const BOARD_WIDTH = BOARD_COLUMNS * 2 * DISC_R + BOARD_COLUMNS * HOLE_SPACE_X;
const BOARD_HEIGHT = BOARD_ROWS * 2 * DISC_R + (BOARD_ROWS + 1) * HOLE_SPACE_Y;

// Create main canvas
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
export function colFromX(x) {
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
    BOARD_WIDTH,
    BOARD_HEIGHT,
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

function drawDiscs(board) {
  for (var r = 0; r < BOARD_ROWS; r++) {
    for (var c = 0; c < BOARD_COLUMNS; c++) {
      ctx.beginPath();
      var color = board.get(r, c);
      if (color == DISC_RED) {
        ctx.fillStyle = 'red';
      } else if (color == DISC_YELLOW) {
        ctx.fillStyle = 'yellow';
      } else if (color == DISC_EMPTY) {
        ctx.fillStyle = 'white';
      }
      ctx.arc(
        xCoord(c),
        yCoord(r),
        DISC_R,       // radius
        0,            // start angle
        2 * Math.PI,  // end angle
      );
      ctx.fill();
    }
  }
}

function drawResult(board) {
  var text = '';
  var result = board.getResult();
  switch (result) {
    case RESULT_RED_WINS:
      text = 'Red Wins';
      break;
    case RESULT_YELLOW_WINS:
      text = 'Yellow Wins';
      break;
    case RESULT_RED_PLAYS:
      text = 'Red Plays';
      break;
    case RESULT_YELLOW_PLAYS:
      text = 'Yellow Plays';
      break;
    case RESULT_DRAW:
      text = 'Draw';
      break;
  }

  ctx.font = '30px arial';
  ctx.fillStyle = 'white';
  ctx.fillText(
    text, 
    BOARD_START_X + BOARD_WIDTH + RESULT_TEXT_OFFSET_X,
    BOARD_START_Y + RESULT_TEXT_OFFSET_Y,
  );
}

function drawBoundary(x, y) {
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

function redraw(board) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();
  drawBoard();
  drawDiscs(board);
  drawResult(board);
}

export {drawBoundary, redraw};