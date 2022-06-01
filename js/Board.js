export const BOARD_COLUMNS = 7;
export const BOARD_ROWS = 6;

export const DISC_EMPTY = 0;
export const DISC_RED = 1;
export const DISC_YELLOW = 2;

export const RESULT_RED_WINS = 0;
export const RESULT_YELLOW_WINS = 1;
export const RESULT_DRAW = 2;
export const RESULT_RED_PLAYS = 3;
export const RESULT_YELLOW_PLAYS = 4;

export class Board {
  constructor() {
    this.board = Array(BOARD_ROWS).fill(DISC_EMPTY).map(
      () => Array(BOARD_COLUMNS).fill(DISC_EMPTY)
    );
    this.color = DISC_RED;
  }

  get(r, c) {
    return this.board[r][c];
  }

  tossDisk(column) {
    if (column < 0 || column >= BOARD_COLUMNS) {
      throw 'Column for tossing must be valid';
    }
    
    var emptyIndex = this.board.map(row => row[column]).findIndex(e => e != DISC_EMPTY);
    var row = emptyIndex == -1 ? BOARD_ROWS - 1 : emptyIndex - 1;
    if (row < 0) {
      return;
    }
    
    this.board[row][column] = this.color;
    if (this.color == DISC_RED) {
      this.color = DISC_YELLOW;
    } else if (this.color == DISC_YELLOW) {
      this.color = DISC_RED;
    }
  }

  getResult() {
    if (this._hasWin(DISC_RED)) {
      return RESULT_RED_WINS;
    } else if (this._hasWin(DISC_YELLOW)) {
      return RESULT_YELLOW_WINS;
    } else if (this.color == DISC_RED) {
      return RESULT_RED_PLAYS;
    } else if (this.color == DISC_YELLOW) {
      return RESULT_YELLOW_PLAYS;
    }
    return RESULT_DRAW;
  }

  _hasWin(color) {
    return this._hasHorizontalWin(color) 
      || this._hasVerticalWin(color) 
      || this._hasDiagonalWin(color);
  }

  static _anyHas4(arr, color) {
    var color4 = [color, color, color, color];
    var has4 = row => row.toString().indexOf(color4.toString()) > -1;
    return arr.filter(row => has4(row)).length > 0;
  }

  _hasHorizontalWin(color) {
    return Board._anyHas4(this.board, color);
  }

  _hasVerticalWin(color) {
    var transposedBoard = this.board[0].map((col, i) => this.board.map(row => row[i]));
    return Board._anyHas4(transposedBoard, color);
  }

  _hasDiagonalWin(color) {
    var diagonals = [];

    for (var r = 0; r < BOARD_ROWS; r++) {
      var diagonal = [];
      for (var c = 0, ri = r; c < BOARD_COLUMNS && ri < BOARD_ROWS; c++, ri++) {
        diagonal.push(this.get(ri, c));
      }
      diagonals.push(diagonal);
    }

    for (var c = 0; c < BOARD_COLUMNS; c++) {
      var diagonal = [];
      for (var r = 0, ci = c; r < BOARD_ROWS && ci < BOARD_COLUMNS; r++, ci++) {
        diagonal.push(this.get(r, ci));
      }
      diagonals.push(diagonal);
    }

    for (var r = 0; r < BOARD_ROWS; r++) {
      var diagonal = [];
      for (var c = BOARD_COLUMNS - 1, ri = r; c >= 0 && ri < BOARD_ROWS; c--, ri++) {
        diagonal.push(this.get(ri, c));
      }
      diagonals.push(diagonal);
    }

    for (var c = 0; c < BOARD_COLUMNS; c++) {
      var diagonal = [];
      for (var r = 0, ci = c; r < BOARD_ROWS && ci >= 0; r++, ci--) {
        diagonal.push(this.get(r, ci));
      }
      diagonals.push(diagonal);
    }

    return Board._anyHas4(diagonals, color);
  }
}