const cursor = document.querySelector('.cursor');
const circles = [...document.querySelectorAll('.circle')];
const scoreEl = document.querySelector('#score span');
const timerDisplay = document.querySelector('#timeleft span');

let scoreValue = 0;
let timeLeft = 60; // Initial time in seconds

function updateTimer() {
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
        console.log("Final score:", scoreValue); // Log the final score
        clearTimeout(timer);
        if (scoreValue > 300) {
            alert("YOU WIN!");
        } else if (scoreValue >= 100 && scoreValue <= 290) {
            alert("YOU COULD DO BETTER");
        } else {
            alert("YOU LOSE!");
        }
    } else {
        timeLeft--;
        setTimeout(updateTimer, 1000); // Update timer every second (1000 milliseconds)
    }
}

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
