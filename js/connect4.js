import {Board} from './Board.js';
import {colFromX, drawBoundary, redraw} from './draw.js';


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
}

document.addEventListener('mousemove', onMouseUpdate);
document.addEventListener('click', onMouseClick);

redraw(b);


