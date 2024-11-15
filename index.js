let tries = parseInt(localStorage.getItem('tries')) || 7;
let guess = '';
let code = localStorage.getItem('code') || generateCode();

document.addEventListener("DOMContentLoaded", loadLog);

if (!localStorage.getItem('code')) {
    localStorage.setItem('code', code);
}

function generateCode() {
    return '' + (Math.floor(Math.random() * 3) + 1) + (Math.floor(Math.random() * 3) + 1) + (Math.floor(Math.random() * 3) + 1);
}

function addDigit(digit) {
    if (guess.length < 3) {
        guess += digit;
        updateDisplay();
        if (guess.length === 3) checkGuess();
    }
}

function updateDisplay() {
    document.getElementById('digit1').innerText = guess[0] || '_';
    document.getElementById('digit2').innerText = guess[1] || '_';
    document.getElementById('digit3').innerText = guess[2] || '_';
}

function checkGuess() {
    if (guess === code) {
        alert("You cracked the vault!");
        resetGame();
    } else {
        let feedback = guess > code ? "Lower" : "Higher";
        logAttempt(guess + ": " + feedback);
        tries--;
        document.getElementById('tries-left').innerText = tries;

        if (tries === 0) {
            alert("Out of tries! Game Over.");
            resetGame();
        } else {
            clearGuess();
        }
    }
}

function clearGuess() {
    guess = '';
    updateDisplay();
}

function logAttempt(message) {
    let logList = document.getElementById('log-list');
    let logItem = document.createElement('li');
    logItem.innerText = message;
    logList.appendChild(logItem);

    let logHistory = JSON.parse(localStorage.getItem('logHistory')) || [];
    logHistory.push(message);
    localStorage.setItem('logHistory', JSON.stringify(logHistory));
}

function loadLog() {
    document.getElementById('tries-left').innerText = tries;
    let logHistory = JSON.parse(localStorage.getItem('logHistory')) || [];
    let logList = document.getElementById('log-list');
    logHistory.forEach(message => {
        let logItem = document.createElement('li');
        logItem.innerText = message;
        logList.appendChild(logItem);
    });
}

function resetGame() {
    tries = 7;
    code = generateCode();
    guess = '';
    localStorage.setItem('tries', tries);
    localStorage.setItem('code', code);
    localStorage.setItem('logHistory', JSON.stringify([]));

    document.getElementById('tries-left').innerText = tries;
    document.getElementById('log-list').innerHTML = '';
    clearGuess();
}