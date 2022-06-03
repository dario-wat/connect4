import {Board} from './Board.js';
import {colFromX, drawBoundary, redraw} from './draw.js';
import {minimax} from './minimax.js';


var b = new Board();


function onMouseUpdate(e) {
  redraw(b);
  drawBoundary(e.x, e.y);
}

function onMouseClick(e) {
  var col = colFromX(e.x);
  b.tossDisk(col);
  redraw(b);
  drawBoundary(e.x, e.y);
  console.log(b.allMovesWithColumns().map(bo => [bo[0], minimax(bo[1], 6, -Infinity, Infinity, b.color)]));
  // var val = minimax(b, 6, -Infinity, Infinity, b.color);
  // console.log(val);
  // console.log(b.allMoves());
}

document.addEventListener('mousemove', onMouseUpdate);
document.addEventListener('click', onMouseClick);

redraw(b);

