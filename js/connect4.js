// Dimensions of the board
const DISC_R = 50;
const HOLE_SPACE_X = 30;
const HOLE_SPACE_Y = 15;
const BOARD_WIDTH = 7;
const BOARD_HEIGHT = 6;
const BOARD_START_X = 50;
const BOARD_START_Y = 50;


var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

function xCoord(column) {
  return BOARD_START_X + (column + 1) * HOLE_SPACE_X + column * 2 * DISC_R + DISC_R;
}

function yCoord(row) {
  return BOARD_START_Y + (row + 1) * HOLE_SPACE_Y + row * 2 * DISC_R + DISC_R;
}

function drawBoard() {
  ctx.fillStyle = 'blue';
  ctx.fillRect(
    BOARD_START_X, 
    BOARD_START_Y,
    BOARD_WIDTH * 2 * DISC_R + (BOARD_WIDTH + 1) * HOLE_SPACE_X, 
    BOARD_HEIGHT * 2 * DISC_R + (BOARD_HEIGHT + 1) * HOLE_SPACE_Y,
  );

  for (r = 0; r < BOARD_HEIGHT; r++) {
    for (c = 0; c < BOARD_WIDTH; c++) {
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

drawBoard();