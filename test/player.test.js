import Player from '../src/js/player';
import isEqual from 'lodash.isequal';

function SetNest(arr = []) {
    const set = new Set();
    for(const el of arr){
        add(el);
    }

    function add(value) {
        for(const v of set) {
            if(isEqual(value, v)) return;
        }
        set.add(value);
    }
    function deleteValue(value) {
        for(const v of set) {
            if(isEqual(value, v)) {
                set.delete(v);
            }
        }
    }
    return {
        get length() {
            return set.size;
        },
        add,
        deleteValue
    }
}

test("computer player must give all different coordinate", () => {
    const player = Player();
    const moves = SetNest();
    for(let i = 0; i < 100; i++) {
    
        moves.add(player.getCoords());
    }
    expect(moves.length).toBe(100);
});