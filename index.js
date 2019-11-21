const winners = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const grid = () => Array.from(document.getElementsByClassName('box'));
const boxNumId = (box) => Number.parseInt(box.id.replace('box', ''));
const emptyBoxes = () => grid().filter(_box => _box.innerText === '');
const allSame = (arr) => arr.every(_box => _box.innerText === arr[0].innerText && _box.innerText !== '');
const turn = (index, letter) => grid()[index].innerText = letter;

const endGame = (winningSequence) => {
    winningSequence.forEach(_box => _box.classList.add('winner'));
    disableListeners();
}

const checkForWinner = () => {
    let winner = false;

    winners.forEach(_win => {
        const _grid = grid();
        const sequence = [_grid[_win[0]], _grid[_win[1]], _grid[_win[2]]];
        if(allSame(sequence)){
            winner = true;
            endGame(sequence);
        }
    });
    return winner;
}

const opponentChoice = () => boxNumId(emptyBoxes()[Math.floor(Math.random() * emptyBoxes().length)]);

const opponentTurn = () => {
    disableListeners();
    setTimeout(() => {
        turn(opponentChoice(), 'O');
        if(!checkForWinner())
            enableListeners();
    }, 1000);
}

const clickFn = (event) => {
    turn(boxNumId(event.target), 'X');
    if(!checkForWinner())
        opponentTurn();
}

const enableListeners = () => grid().forEach(_box => _box.addEventListener('click', clickFn));
const disableListeners = () => grid().forEach(_box => _box.removeEventListener('click', clickFn));

enableListeners();