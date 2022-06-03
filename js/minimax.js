import {DISC_RED, DISC_YELLOW, RESULT_RED_WINS, RESULT_YELLOW_WINS, RESULT_DRAW} from './Board.js';

export function minimax(board, depth, alpha, beta, maxColor) {
  if (
    board.getResult() == RESULT_RED_WINS && maxColor == DISC_RED
    || board.getResult() == RESULT_YELLOW_WINS && maxColor == DISC_YELLOW
  ) {
    return 1 + depth;
  }

  if (
    board.getResult() == RESULT_RED_WINS && maxColor == DISC_YELLOW
    || board.getResult() == RESULT_YELLOW_WINS && maxColor == DISC_RED
  ) {
    return -1 - depth;
  }

  if (board.getResult() == RESULT_DRAW || depth == 0) {
    return 0;
  }

  var maximizingPlayer = board.color == maxColor;
  if (maximizingPlayer) {
    var value = -Infinity;
    for (const boardState of board.allMoves()) {
      var d = depth - 1;
      value = Math.max(value, minimax(boardState, d, alpha, beta, maxColor));
      if (value >= beta) {
        break;
      }
      alpha = Math.max(alpha, value);
    }
    return value
  } else {
    var value = Infinity;
    for (const boardState of board.allMoves()) {
      var d = depth - 1;
      value = Math.min(value, minimax(boardState, d, alpha, beta, maxColor));
      if (value <= alpha) {
        break;
      }
      beta = Math.min(beta, value);
    }
    return value
  }
}