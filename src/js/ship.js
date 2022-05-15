function Ship(length) {
    if(length < 1 || length > 5) {
        throw new Error("ship length must be between 1 and 5");
    }

    let hitPoints = new Array(length).fill(false, 0);

    function hit(pos) {
        if(pos > length || pos < 1) return;
        hitPoints[pos] = true;
    }

    function isSunk() {
        return hitPoints.filter(pos => !pos).length === 0;
    }

    return {
        hitPoints,
        length,
        hit,
        isSunk
    }
}

export default Ship;