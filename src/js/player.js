import isEqual from 'lodash.isequal';

const shipsLength = [5, 4, 3, 3, 2];

function Player() {
  const coordsList = new Set();

  function getCoords() {
    const coords = {};

    do {
      coords.x = _randomCoord();
      coords.y = _randomCoord();
    } while (_nestResearch(coords));

    coordsList.add(coords);

    return coords;
  }

  function _randomCoord() {
    return Math.floor(Math.random() * 10);
  }

  function _nestResearch({ x, y }) {
    for (const coords of coordsList) {
      if (coords.x === x && coords.y === y) return true;
    }
    return false;
  }

  function _generateCoordsShip() {
    const coords = [];
    for (const length of shipsLength) {
      const axis = Math.floor(Math.random() * 10) + 1 > 5 ? "x" : "y";
      let x, y;
      do {
        x = _randomCoord();
        y = _randomCoord();
      } while (
        (axis === "x" && x + length > 9) ||
        (axis === "y" && y + length > 9) ||
        noOverlap(coords, x, y, axis, length)
      );

      coords.push({ x, y, axis });
    }
    return coords;
  }

  return {
    getCoords,
    coordsShips: _generateCoordsShip(),
  };
}

function noOverlap(coords, x, y, axis, length ) {
    for(let i = 0; i < coords.length; i++) {
        const coord = coords[i];
        const allCoords1 = generateCoords(coord.x, coord.y, coord.axis, shipsLength[i]);
        const allCoords2 = generateCoords(x, y, axis, length);
        for(const coord1 of allCoords1) {
            for(const coord2 of allCoords2) {
                if(isEqual(coord1, coord2)) return true;
            }
        }
    }
    return false;
}

function generateCoords( x, y, axis, length ) {
    const arr = [];
  for (let i = 0; i < length; i++) {
    if (axis === "y") {
      arr.push({x, y: y + i});
    } else {
        arr.push({x: x + i, y});
    }
  }
  return arr;
}

export default Player;
