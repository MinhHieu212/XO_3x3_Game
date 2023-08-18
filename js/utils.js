import { CELL_VALUE, GAME_STATUS } from "./constant.js";

export function checkGameStatus(cell__value) {

    if(!Array.isArray(cell__value) || cell__value.length != 9) {
        
        throw new Error("cell__value invalid in checkGameStatus function");
    }

    const IndexWinList = [

        [0 , 1 , 2],
        [3 , 4 , 5],
        [6 , 7 , 8],

        [0 , 3 , 6],
        [1 , 4 , 7],
        [2 , 5 , 8],
        
        [0 , 4 , 8],
        [2 , 4 , 6],
    ];

    const indexGroupWin = IndexWinList.findIndex((indexCell) =>  {

        const first = cell__value[indexCell[0]];
        const second = cell__value[indexCell[1]];
        const third = cell__value[indexCell[2]];

        return first != "" && first == second && second == third;

    });

    if(indexGroupWin >= 0) {
        
        const index = IndexWinList[indexGroupWin][1];
        const winValue = cell__value[index];
        
        return {

            status: winValue == CELL_VALUE.CIRCLE ? GAME_STATUS.OWIN : GAME_STATUS.XWIN,
            indexWinPosition: IndexWinList[indexGroupWin]

        }
    }

    return {

        status: cell__value.filter((x) => x == "").length == 0 ? GAME_STATUS.END : GAME_STATUS.PLAYING,
        indexWinPosition: []
    }
    
}