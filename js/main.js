import { CELL_VALUE, GAME_STATUS, TURN } from "./constant.js";
import { getCellListElement, getCellbyIndexAt, getCurrentStatusElement, getCurrentTurnElement, getReplayButtonElement } from "./selector.js";
import { checkGameStatus } from "./utils.js";

let current__status = GAME_STATUS.PLAYING;
let current__turn = TURN.CROSS;
let cell__value = new Array(9).fill("");

export function updateStatus(status) {

    current__status = status;
    const Cur_status = getCurrentStatusElement();
    Cur_status.textContent = current__status;
}

export function showReplayButton() {

    const replayButton = getReplayButtonElement();
    replayButton.classList.add('show');
}

export function hightlineWinCells(indexWinPosition) {

    for (const index of indexWinPosition) {

        const cell = getCellbyIndexAt(index);

        if(cell) {

            cell.classList.add(CELL_VALUE.WIN);
        }
    }
}


function handleCellEvent(cell , index) {

    const isClicked = cell.classList.contains(TURN.CIRCLE)||  cell.classList.contains(TURN.CROSS);
    const isEnd = current__status != GAME_STATUS.PLAYING;

    if(isClicked || isEnd) return;

    // add x or o to cell
    cell.classList.add(current__turn);

    cell__value[index] = current__turn == TURN.CIRCLE ? CELL_VALUE.CIRCLE : CELL_VALUE.CROSS;

    const game = checkGameStatus(cell__value);

    switch(game.status) {

        case GAME_STATUS.OWIN : {

            updateStatus(GAME_STATUS.OWIN);
            showReplayButton();
            hightlineWinCells(game.indexWinPosition);
            break;
        }
        case GAME_STATUS.XWIN : {

            updateStatus(GAME_STATUS.XWIN);
            showReplayButton();
            hightlineWinCells(game.indexWinPosition);
            break;
        }   
        case GAME_STATUS.END : {
            
            updateStatus(GAME_STATUS.END);
            showReplayButton();
            break;
        }
        default : {

            break;
        }
    }
    // toggle turn
    current__turn = current__turn == TURN.CIRCLE ? TURN.CROSS : TURN.CIRCLE;
  
    const curTurn = getCurrentTurnElement();
    curTurn.classList.remove(TURN.CIRCLE , TURN.CROSS);

    if(curTurn) {

        curTurn.classList.add(current__turn);
    } 
}

function initCellEvent() {

    const cellList = getCellListElement();
    if(!cellList) throw new Error("cellList invalid");

    cellList.forEach((cell , index) => {

        cell.addEventListener('click' , () => handleCellEvent(cell , index));
    });
}

export function resetGame() {

    current__turn = TURN.CROSS;
    current__status = GAME_STATUS.PLAYING;
    cell__value = cell__value.map((x) => "");
    
    const cellList = getCellListElement();

    for (const cell of cellList) {
        
        cell.classList = "";
    }

    updateStatus(GAME_STATUS.PLAYING);

    const Cur_turn = getCurrentTurnElement();

    if(Cur_turn) {
        
        Cur_turn.classList.remove(TURN.CROSS , TURN.CIRCLE);
        Cur_turn.classList.add(TURN.CROSS);
    }
}

function initReplayButton() {

    const replayButton = getReplayButtonElement();
    if(replayButton) {

        replayButton.addEventListener('click' , resetGame)
    }
}

(() => {
    
    initCellEvent();
    initReplayButton();

})();