function coordsFromIndex(i) {
    const coordsString = i.toString().padStart(2, "0");
    return {
        x: +coordsString[1],
        y: +coordsString[0]
    }
}

function indexFromCoords({ x, y }) {
    return Number(y.toString() + x.toString());
} 

export {
    coordsFromIndex,
    indexFromCoords,
}