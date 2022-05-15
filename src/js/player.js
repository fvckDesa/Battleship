function Player() {
    const coordsList = new Set();

    function getCoords() {
        const coords = {};

        do {
            coords.x = _randomCoord();
            coords.y = _randomCoord();
        } while(_nestResearch(coords));

        coordsList.add(coords);

        return coords;
    }

    function _randomCoord() {
        return Math.floor(Math.random() * 10);
    }

    function _nestResearch({ x, y }) {
        for(const coords of coordsList) {
            if(coords.x === x && coords.y === y) return true;
        }
        return false;
    }

    return {
        getCoords
    }
}

export default Player;