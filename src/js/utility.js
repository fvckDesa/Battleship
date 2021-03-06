function isValidCoord({ x, y, axis }, length, board) {
  if (
    x < 0 ||
    x >= board.length ||
    y < 0 ||
    y >= board.length ||
    (axis !== "x" && axis !== "y")
  )
    return false;
  for (let i = 0; i < length; i++) {
    if (
      (axis === "y" &&
        (y + i < 0 || y + i >= board.length || board[y + i][x] != null)) ||
      (axis === "x" &&
        (x + i < 0 || x + i >= board.length || board[y][x + i] != null))
    )
      return false;
  }
  return true;
}

function createSquareMatrix(length) {
  return new Array(length)
    .fill(null)
    .map(() => new Array(length).fill(null));
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export { isValidCoord, createSquareMatrix, delay };
