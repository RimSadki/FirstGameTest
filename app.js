const circles = document.querySelectorAll('.circle');
const mole = document.querySelector('.mole');
const timeleft = document.querySelector('#time-left');
const score = document.querySelector('#score');
let result = 0;

function randomCircle() {
    circles.forEach(circle => {
        circle.classList.remove('mole');
    });
    
    let randomIndex = Math.floor(Math.random() * circles.length);
    let randomPosition = circles[randomIndex];
    randomPosition.classList.add('mole');
}


