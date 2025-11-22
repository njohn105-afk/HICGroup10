// INCLUDE this script BEFORE any other scripts in each html file
// This ensures that the player data is loaded and visuals updated


class Player {
    constructor() {
        this.balance = Number(localStorage.getItem("balance")) ?? 1000;
        // Can add more variables in the future (like history tracking)
        this.updateBalanceBox();
    }

    getBalance() {
        return this.balance ?? 0;
    }

    hasEnough(amount) {
        return this.balance >= amount;
    }

    addCurrency(amount) {
        this.balance += amount;
        localStorage.setItem("balance", this.balance);
        this.updateBalanceBox();
    }

    removeCurrency(amount) {
        if (this.hasEnough(amount)) this.addCurrency(-amount);
        else console.log("Attempted to remove too much balance!");
    }

    updateBalanceBox() {
        const balance_boxes = document.querySelectorAll('#balance-amount');
        for (const balance_box of balance_boxes) {
            balance_box.textContent = this.getBalance();
        }
    }
}

const player = new Player();
