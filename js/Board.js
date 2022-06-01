export const BOARD_COLUMNS = 7;
export const BOARD_ROWS = 6;

export const DISC_EMPTY = 0;
export const DISC_RED = 1;
export const DISC_YELLOW = 2;

export class Board {
  constructor() {
    this.board = Array(BOARD_ROWS).fill(DISC_EMPTY).map(
      () => Array(BOARD_COLUMNS).fill(DISC_EMPTY)
    );
    this.color = DISC_RED;
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

  get(r, c) {
    return this.board[r][c];
  }
}