
const baseWinnings = 10; // Base winnings per safe cell
const safeCellMultiplier = 3; // Multiplier for each safe cell revealed
const mineMultiplier = 5; // Multiplier for each mine on the board

let placeBetButton, betAmountField, mineCountField, boardEl, claimWinningsButton, currentWinningsButton;

let mines = new Set();
const gridSize = 5;
const totalCells = gridSize * gridSize;

let currentWinnings = 0;

window.onload = function() {
    placeBetButton = document.getElementById("place-bet");
    betAmountField = document.getElementById("chip_cost");
    mineCountField = document.getElementById("mine_count");
    boardEl = document.getElementById('mines-board');
    claimWinningsButton = document.getElementById('claim-winnings')
    currentWinningsButton = document.getElementById("current-winnings-amount")

    placeBetButton.addEventListener("click", placeBet);
    claimWinningsButton.addEventListener("click", claimWinnings);

    createGrid(gridSize);
    disableAllCells(true);
}

function placeBet() {
    const mineCount = Math.max(1, Math.min(totalCells - 1, parseInt(mineCountField.value) || 6));
    const wagerAmount = parseInt(betAmountField.value) || 100;

    if (!player.hasEnough(wagerAmount)) {
        alert("Insufficient balance to place this bet!");
        return;
    }

    player.removeCurrency(wagerAmount);

    toggleBetContainer(false);
    startGame(mineCount);
}

function toggleBetContainer(to) {
    const container = document.querySelector('.bet-container');
    if (to === false) container.classList.add("disabled");
    else container.classList.remove("disabled");
}

function startGame(mineCount) {
    resetBoard();
    resetWinnings();
    createGrid(gridSize);
    placeMines(mineCount);
    disableAllCells(false);
}

function createGrid(size) {
    const board = boardEl;
    board.innerHTML = '';
    for (let i = 0; i < size * size; i++) {
        const btn = document.createElement('button');
        btn.className = 'mine-cell';
        btn.type = 'button';
        btn.dataset.index = i;
        btn.addEventListener('click', onCellClick);
        board.appendChild(btn);
    }
}

function placeMines(count) {
    while (mines.size < count) {
        const idx = Math.floor(Math.random() * totalCells);
        mines.add(idx);
    }
}

function onCellClick(event) {
    const cellIndex = parseInt(event.target.dataset.index);

    if (mines.has(cellIndex)) {
        event.target.classList.add('mine-cell', 'mine');
        toggleBetContainer(true);
        disableAllCells(true);
        player.addToGameHistory("mines", parseInt(betAmountField.value), -parseInt(betAmountField.value));
        resetWinnings();
    } else {
        // cell is safe
        event.target.classList.add('mine-cell', 'revealed');
        updateWinnings(calculateWinningsForCell());
    }

    event.target.disabled = true;
}

function claimWinnings() {
    if (currentWinnings > 0) {
        player.addCurrency(currentWinnings);
        player.addToGameHistory("mines", parseInt(betAmountField.value), currentWinnings);
        resetWinnings();
        disableAllCells(true);
        toggleBetContainer(true);
    }
}

function calculateWinningsForCell() {
    const safeCellsRevealed = boardEl.querySelectorAll('.mine-cell.revealed').length;
    const mineCount = mines.size;
    const betAmount = parseInt(betAmountField.value) || 100;

    return (betAmount / 100) * (baseWinnings + (safeCellsRevealed * safeCellMultiplier) + (mineCount * mineMultiplier));
}

function updateWinnings(amount) {
    currentWinnings += amount;
    currentWinningsButton.textContent = `$${currentWinnings}`;
}

function resetWinnings() {
    currentWinnings = 0;
    currentWinningsButton.textContent = `$${currentWinnings}`;
}

function resetBoard() {
    mines.clear();
    boardEl.innerHTML = '';
}

function disableAllCells(disabled) {
    const cells = boardEl.querySelectorAll('.mine-cell');
    cells.forEach(cell => {
        if (disabled === true) {
            cell.disabled = true;
        } else {
            cell.disabled = false;
        }
    });
}