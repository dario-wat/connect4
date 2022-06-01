import {Board, DISC_EMPTY, DISC_RED, DISC_YELLOW} from './Board.js';
import {colFromX, drawBoundary, redraw} from './draw.js';


var b = new Board();
b.tossDisk(3);
b.tossDisk(3);
b.tossDisk(3);
var color = DISC_RED;
console.log(b);


function onMouseUpdate(e) {
  redraw(b);
  var x = e.x;
  var y = e.y;
  drawBoundary(x, y);
  
}

function onMouseClick(e) {
  // console.log(e);

  var col = colFromX(e.x);
  b.tossDisk(col);
  // console.log(col);
  redraw(b);
  drawBoundary(e.x, e.y);
}

document.addEventListener('mousemove', onMouseUpdate);
document.addEventListener('click', onMouseClick);

redraw(b);


