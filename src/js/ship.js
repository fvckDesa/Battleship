

/**
 * Factory function creates a new object with a length property, a hitPoints property, a hit method, and an isSunk
 * method.
 * 
 * The length property is read-only and is set to the length argument passed to the Ship function.
 * 
 * The hitPoints property is read-only and is set to an array of length length, filled with false
 * values.
 * 
 * The hit method takes a number as an argument and sets the value of the hitPoints array at that index
 * to true.
 * 
 * The isSunk method returns true if every value in the hitPoints array is true, and false otherwise.
 * @param length - The length of the ship. Must be between 1 and 5.
 * @returns An object with the properties length, hitPoints, hit, and isSunk.
 */
function Ship(length) {
    if(length > 5 || length < 1) {
        throw new Error("Length of the ship must be between 1 and 5");
    }
    const hitPoints = new Array(length).fill(false);

    function hit(shipPos) {
        hitPoints[shipPos] = true;
    }

    function isSunk() {
        return hitPoints.every(pos => pos === true);
    }

    return {
        get length() {
            return length;
        },
        get hitPoints() {
            return hitPoints;
        },
        hit,
        isSunk
    };
}

export default Ship;