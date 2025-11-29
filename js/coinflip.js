
let placeBetButton, betAmountField, coinflipChoiceField;

window.onload = function() {
    placeBetButton = document.getElementById("place-bet");
    betAmountField = document.getElementById("chip_cost");
    coinflipChoiceField = document.getElementById("coinflip-choice");

    placeBetButton.addEventListener("click", placeBet);
}

function placeBet() {
    const wagerAmount = parseInt(betAmountField.value) || 100;
    const coinflipChoice = coinflipChoiceField.value;

    if (!player.hasEnough(wagerAmount)) {
        alert("Insufficient balance to place this bet!");
        return;
    }

    player.removeCurrency(wagerAmount);

    toggleBetContainer(false);
    //startGame(coinflipChoice);
}

function toggleBetContainer(to) {
    const container = document.querySelector('.bet-container');
    if (to === false) container.classList.add("disabled");
    else container.classList.remove("disabled");
}