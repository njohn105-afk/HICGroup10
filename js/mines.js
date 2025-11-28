
let placeBetButton, betAmountField, mineCountField, boardEl;

let mines = new Set();
const gridSize = 5;
const totalCells = gridSize * gridSize;

window.onload = function() {
    placeBetButton = document.getElementById("place-bet");
    betAmountField = document.getElementById("chip_cost");
    mineCountField = document.getElementById("mine_count");
    boardEl = document.getElementById('mines-board');

    setBetListeners();
}

function setBetListeners() {
    placeBetButton.addEventListener("click", placeBet);
}

function placeBet() {
    const count = Math.max(1, Math.min(totalCells - 1, parseInt(mineCountField.value) || 6));

    toggleBetContainer(false);
    startGame(count);
}

function toggleBetContainer(to) {
    const container = document.querySelector('.bet-container');
    if (to === false) container.classList.add("disabled");
    else container.classList.remove("disabled");
}

function startGame(mineCount) {
    mines.clear();
    createGrid(gridSize);
    placeMines(mineCount);
}

function createGrid(size) {
    const board = boardEl;
    board.innerHTML = '';
    for (let i = 0; i < size * size; i++) {
        const btn = document.createElement('button');
        btn.className = 'mine-cell';
        btn.type = 'button';
        btn.dataset.index = i;
        //btn.addEventListener('click', onCellClick);
        board.appendChild(btn);
    }
}

function placeMines(count) {
    while (mines.size < count) {
        const idx = Math.floor(Math.random() * totalCells);
        mines.add(idx);
    }
}

