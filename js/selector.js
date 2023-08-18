export function getULboardElement() {
    return document.getElementById('gameBoard');
}

export function getCellListElement() {
    return document.querySelectorAll('#gameBoard > li');
}

export function getCellbyIndexAt(index) {   
    return document.querySelector(`#gameBoard > li:nth-child(${index + 1})`);
}

export function getReplayButtonElement() {
    return document.getElementById('replayGame');
}   

export function getCurrentStatusElement() {
    return document.getElementById('curentStatus');
}

export function getCurrentTurnElement() {
    return document.getElementById('curentTurn');
}