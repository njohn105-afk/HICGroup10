//TODO:
// Balance checks and restrictions on bet placement
// Move ball in pocket until user decides to play again
// Lock input after locking in bet
// Better styling
// "Chip" placement on roulette numbers in selection menu
// Physical number display and win/lose screen
// Organize style sheet for roulette
// Actual balance module for add/remove and update on site
// Figure out how to rotate the ball CCW and still reach the correct number
// ^^^ Maybe just flip the image offset?




const choiceTable = new Map();
const wheelOrder = [
    0, 32, 15, 19, 4, 21, 2, 25, 17, 34,
    6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24,
    16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7,
    28, 12, 35, 3, 26
];

// To determine the correct rotation of any given number pocket on the roulette wheel
// So we can move the ball toward that rotational value corresponding.
const ANGLE_PER_SLOT = 360 / 37;

const ballTravelTime = 1800;  // ms
const outerRadius = 260; // The ball's orbit radius
const innerRadius = 230; // how far the ball should fall into the pocket

const IMAGE_OFFSET = -82;  // IDK WHY THIS RANDOM OFFSET WORKED BUT IT DOES, DON'T CHANGE IT

let chipValue = 0;
let totalBet = 0;

let winningIndex = 0;
let startTime = 0;

let ballAngle = 0;
let initialBallAngle = 0;
let ballRadius = outerRadius;

// Get initial angles of each pocket (number) on the roulette wheel
const basePocketAngles = wheelOrder.map((_, i) => i * ANGLE_PER_SLOT);

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function lerp(a, b, t) {
    return a + (b - a) * t;
}

function easeOut(t) {
    return 1 - Math.pow(1 - t, 3);
}

function easeIn(t) {
    return t * t * t;
}

function getWheelAngle() {
    const wheel = document.getElementById("wheel");
    const style = window.getComputedStyle(wheel);
    const transform = style.transform;

    if (transform === "none") return 0;

    const values = transform.match(/matrix.*\((.+)\)/)[1].split(", ");
    const a = parseFloat(values[0]);
    const b = parseFloat(values[1]);

    let angle = Math.atan2(b, a) * (180 / Math.PI);
    if (angle < 0) angle += 360;
    return angle % 360;
}

function animateBall() {
    const now = performance.now();
    const t = Math.min((now - startTime) / ballTravelTime, 1); 

    const wheelAngle = getWheelAngle(); // current wheel rotation 

    const pocketBase = basePocketAngles[winningIndex];
    const targetAngle = (pocketBase + IMAGE_OFFSET + wheelAngle + 360) % 360;

    ballAngle = lerp(initialBallAngle, targetAngle, easeOut(t));

    ballRadius = lerp(outerRadius, innerRadius, easeIn(t));

    const ball = document.getElementById("ball");

    ball.style.transform = `
        translate(-50%, -50%)
        rotate(${ballAngle}deg)
        translateX(${ballRadius}px)
    `;

    // Animate ball until t reaches 1 (time finished)
    if (t < 1) {
        // Schedule the ball animation to run continuously until finished
        requestAnimationFrame(animateBall);
    } else {
        // Game considered finished (this will happen when ball is placed in pocket)
        finishGame();
    }
}



function startGame() {
    // Get ball element, reset angle settings
    const ball = document.getElementById("ball");
    initialBallAngle = 0;
    ballAngle = 0;
    ballRadius = outerRadius;

    ball.style.transform = `
        translate(-50%, -50%)
        rotate(0deg)
        translateX(${outerRadius}px)
    `;

    // Pick winning pocket 
    winningIndex = getRandomIntInclusive(0,36);
    const winningNumber = wheelOrder[winningIndex];
    console.log("Selected winning number:", winningNumber);

    // Start animation
    startTime = performance.now();
    requestAnimationFrame(animateBall);
}

function finishGame() {
    const winningNumber = wheelOrder[winningIndex];
    console.log("FINAL RESULT:", winningNumber);
}

function buildSelectorButton(div, text, className, id) {
    const selectorButton = document.createElement('div');
    selectorButton.textContent = text;
    selectorButton.className = className;
    selectorButton.id = id;
    selectorButton.addEventListener("click", function () {
        addToChoice(id, chipValue);
    });
    div.appendChild(selectorButton);
}

function buildSelector() {
    const choiceDiv = document.querySelector('.roulette-choices');
    if (choiceDiv) {
        for (let i = 0; i <= 36; i++) {
            let color;
            if (i === 0) color = 'green';
            else if (i % 2 === 0) color = 'red';
            else color = 'black';
            buildSelectorButton(choiceDiv, i, 'roulette-button ' + color, i);
        }
        buildSelectorButton(choiceDiv, "black", 'roulette-button black', "Black");
        buildSelectorButton(choiceDiv, "red", 'roulette-button red', "Red");
    }
}

function buildChoices() {
    for (let i = 0; i <= 36; i++) {
        choiceTable.set(i, 0);
    }
    choiceTable.set("black", 0);
    choiceTable.set("red", 0);
}

function addToChoice(choice, amount) {
    choiceTable.set(choice, choiceTable.get(choice) + amount);
    totalBet += amount;
    const betAmountText = document.querySelector('#bet-amnt');
    betAmountText.textContent = totalBet;
}


window.onload = function () {
    buildSelector();
    buildChoices();

    const inputField = document.getElementById('chip_cost');
    inputField.addEventListener("input", function () {
        chipValue = Number(inputField.value);
    });

    document.getElementById("place-bet")
        .addEventListener("click", startGame);

    document.getElementById("wheel").classList.add("idle-spin");
};