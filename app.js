const cursor = document.querySelector('.cursor');
const circles = [...document.querySelectorAll('.circle')];
const scoreEl = document.querySelector('#score span');
const timerDisplay = document.querySelector('#timeleft span');
let scoreValue = 0;
let timeLeft = 60; // Initial time in seconds

function updateTimer() {
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
        clearTimeout(timer);
        endGame();
    } else {
        timeLeft--;
        timer = setTimeout(updateTimer, 1000);
    }
}

function endGame() {
    if (scoreValue > 150) {
        displayMessage("YOU WIN!");
    } else if (scoreValue >= 80 && scoreValue <= 140) {
        displayMessage("YOU COULD DO BETTER");
    } else {
        displayMessage("YOU LOSE!");
    }
}

function displayMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.style.position = 'absolute';
    messageElement.style.top = '50%';
    messageElement.style.left = '50%';
    messageElement.style.transform = 'translate(-50%, -50%)';
    messageElement.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    messageElement.style.color = 'white';
    messageElement.style.fontWeight = 'bold';
    messageElement.style.fontSize = '24px';
    messageElement.style.padding = '20px';
    messageElement.style.borderRadius = '10px';
    messageElement.style.textAlign = 'center';
    document.body.appendChild(messageElement);

    const restartButton = document.createElement('button');
    restartButton.textContent = 'Restart';
    restartButton.style.display = 'block';
    restartButton.style.marginTop = '20px';
    restartButton.style.color = 'white'; // Button text color
    restartButton.style.border = 'none'; // Remove button border
    restartButton.style.borderRadius = '5px'; // Button border radius
    restartButton.style.cursor = 'pointer'; // Change cursor to pointer on hover
    restartButton.style.fontSize = '20px'; // Increase font size
    restartButton.style.padding = '15px 30px'; // Increase padding
    restartButton.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    restartButton.addEventListener('click', function() {
        document.body.removeChild(messageElement);
        document.body.removeChild(restartButton);
        startGame();
    });
    document.body.appendChild(restartButton);
}


function startGame() {
    scoreValue = 0;
    scoreEl.textContent = scoreValue;
    timeLeft = 60;
    updateTimer();
}

startGame();

function run() {
    const i = Math.floor(Math.random() * circles.length);
    const circle = circles[i];
    let timer = null;

    const img = document.createElement('img');
    img.classList.add('mole');
    img.src = '.idea/assets/mole.png';

    img.addEventListener('click', () => {
        scoreValue += 10;
        scoreEl.textContent = scoreValue;
        img.src = '.idea/assets/mole-whacked.png';
        clearTimeout(timer);
        setTimeout(() => {
            circle.removeChild(img);
            run();
        }, 500);
    });

    circle.appendChild(img);

    timer = setTimeout(() => {
        circle.removeChild(img);
        run();
    }, 1500);
}

run();
updateTimer(); // Start the timer

window.addEventListener('mousemove', e => {
    cursor.style.top = e.pageY + 'px';
    cursor.style.left = e.pageX + 'px';
});

window.addEventListener('mousedown', () => {
    cursor.classList.add('active');
});

window.addEventListener('mouseup', () => {
    cursor.classList.remove('active');
});
