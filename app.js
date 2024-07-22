let usedNumbers = [];
let limitNumber = 10;
let secretNumber = generateRandomNumber();
let attempts = 1;

function screenText(tag, text) {
    let input = document.querySelector(tag);
    input.innerHTML = text;
    responsiveVoice.speak(text, 'Brazilian Portuguese Female', {rate:1.2});
}

function inicialMessage() {
    screenText('h1', 'secret number game');
    screenText('p', 'pick a number between 1 and 10');
}

inicialMessage();

function verifyGuess() {
    let guess = document.querySelector('input').value;
    
    if (guess == secretNumber) {
        screenText('h1', 'you did it great!!');
        let attemptWord = attempts > 1 ? 'attempts' : 'attempt';
        let mensagemTentativas = `you have discovered in ${attempts} ${attemptWord}!`;
        screenText('p', mensagemTentativas);
        document.getElementById('restart').removeAttribute('disabled');
    } else {
        if (guess > secretNumber) {
            screenText('p', 'secret number is smaller');
        } else {
            screenText('p', 'secret number is greater');
        }
        attempts++;
        clearInput();
    }
}

function generateRandomNumber() {
    let pickedNumber = parseInt(Math.random() * limitNumber + 1);
    let attemptNumbers = usedNumbers.length;

    if (attemptNumbers == limitNumber) {
        usedNumbers = [];
    }
    if (usedNumbers.includes(pickedNumber)) {
        return generateRandomNumber();
    } else {
        usedNumbers.push(pickedNumber);
        console.log(usedNumbers)
        return pickedNumber;
    }
}

function clearInput() {
    guess = document.querySelector('input');
    guess.value = '';
}

function restartGame() {
    secretNumber = generateRandomNumber();
    clearInput();
    attempts = 1;
    inicialMessage();
    document.getElementById('restart').setAttribute('disabled', true)
}







