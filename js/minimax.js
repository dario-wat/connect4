import {DISC_RED, DISC_YELLOW, RESULT_RED_WINS, RESULT_YELLOW_WINS, RESULT_DRAW} from './Board.js';

export function minimax(board, depth, alpha, beta, maxColor) {
  if (
    board.getResult() == RESULT_RED_WINS && maxColor == DISC_RED
    || board.getResult() == RESULT_YELLOW_WINS && maxColor == DISC_YELLOW
  ) {
    return 1;
  }

  if (
    board.getResult() == RESULT_RED_WINS && maxColor == DISC_YELLOW
    || board.getResult() == RESULT_YELLOW_WINS && maxColor == DISC_RED
  ) {
    return -1;
  }

  if (board.getResult() == RESULT_DRAW || depth == 0) {
    return 0;
  }

  var maximizingPlayer = board.color == maxColor;
  if (maximizingPlayer) {
    var value = -Infinity;
    for (const boardState of board.allMoves()) {
      value = Math.max(value, minimax(boardState, depth − 1, alpha, beta, maxColor))
      if (value >= beta) {
        break;
      }
      alpha = Math.max(alpha, value);
    }
    return value
  } else {
    var value = Infinity;
    for (const boardState of board.allMoves()) {
      value = Math.min(value, minimax(boardState, depth − 1, alpha, beta, maxColor))
      if (value <= alpha) {
        break;
      }
      beta = Math.max(beta, value);
    }
    return value
  }
}