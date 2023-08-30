"use strict";
const canvas = document.getElementById("gameCanvas");
const gameCanvas = canvas.getContext("2d");
if (!gameCanvas) {
    throw new Error("Canvas context not available.");
}
// Creating the background
gameCanvas.fillStyle = "#000000";
gameCanvas.fillRect(0, 0, canvas.width, canvas.height);
// Creating the Player
const player = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    width: 50,
    height: 50,
    image: new Image(),
};
player.image.src = '/assets/images/player.png';
player.image.onload = function () {
    gameCanvas.drawImage(player.image, player.x - player.width / 2, player.y - player.height / 2, player.width, player.height);
};
function createPlayer() {
    if (!gameCanvas) {
        return;
    }
    gameCanvas.drawImage(player.image, player.x - player.width / 2, player.y - player.height / 2, player.width, player.height);
}
// Creating the Alien
// Creating the Alien
const aliens = [];
const alien = {
    x: 100,
    y: 50,
    width: 50,
    height: 50,
    health: 0,
    directionX: 0,
    directionY: 0,
    image: new Image(),
};
alien.image.src = '/assets/images/alien.png';
// Defining initial velocity
let vx = 0.5;
let vy = 0.5;
// Creating # of newAlien objects and pushing them to the 'aliens' array.
for (let i = 0; i < 10; i++) {
    let newAlien = Object.assign({}, alien);
    newAlien.x = Math.random() * (canvas.width - newAlien.width);
    newAlien.y = Math.random() * (canvas.height - newAlien.height);
    newAlien.directionX = Math.random() < 0.5 ? -1 : 1;
    newAlien.directionY = Math.random() < 0.5 ? -1 : 1;
    aliens.push(newAlien);
}
function createAlien() {
    if (!gameCanvas) {
        return;
    }
    let aliensRemaining = 0;
    for (let i = 0; i < aliens.length; i++) {
        if (!aliens[i].destroyed) {
            aliensRemaining++;
            const currentAlien = aliens[i];
            currentAlien.x += vx * currentAlien.directionX;
            currentAlien.y += vy * currentAlien.directionY;
            if (currentAlien.x < 0 ||
                currentAlien.x > canvas.width - currentAlien.width) {
                currentAlien.directionX = -currentAlien.directionX;
            }
            if (currentAlien.y < 0 ||
                currentAlien.y > canvas.height - currentAlien.height) {
                currentAlien.directionY = -currentAlien.directionY;
            }
            if (currentAlien.y > canvas.height / 4) {
                currentAlien.y = canvas.height / 4;
                currentAlien.directionY = -currentAlien.directionY;
            }
            gameCanvas.drawImage(currentAlien.image, currentAlien.x, currentAlien.y, currentAlien.width, currentAlien.height);
        }
    }
    if (aliensRemaining === 0) {
        gameCanvas.drawImage(youWinImage, 0, 0, canvas.width, canvas.height);
    }
    else if (gameTime <= 0) {
        gameCanvas.drawImage(gameOverImage, 0, 0, canvas.width, canvas.height);
    }
    else {
        gameCanvas.fillStyle = "white";
        gameCanvas.font = "30px Arial";
        gameCanvas.fillText(`Time: ${gameTime}`, 20, 40);
    }
}
let gameTime = 25;
const countdownInterval = setInterval(function () {
    gameTime--;
    if (gameTime <= 0) {
        clearInterval(countdownInterval);
    }
}, 1000);
let playerMovement = 0;
document.addEventListener('keydown', function (event) {
    switch (event.key) {
        case "ArrowLeft":
            playerMovement = -5;
            break;
        case "ArrowRight":
            playerMovement = 5;
            break;
        case "a":
            playerMovement = -5;
            break;
        case "d":
            playerMovement = 5;
            break;
    }
});
document.addEventListener("keyup", function (event) {
    switch (event.key) {
        case "ArrowLeft":
        case "a":
        case "ArrowRight":
        case "d":
            playerMovement = 0;
            break;
    }
});
function updatePlayer() {
    player.x += playerMovement;
    if (player.x < player.width / 2) {
        player.x = player.width / 2;
    }
    if (player.x > canvas.width - player.width / 2) {
        player.x = canvas.width - player.width / 2;
    }
}
let bullets = [];
function playLaserSound() {
    const audio = new Audio('/assets/sounds/laserpew.ogg');
    audio.play();
}
function fireProjectile() {
    playLaserSound();
}
function createBullets() {
    if (!gameCanvas) {
        return;
    }
    for (let i = 0; i < bullets.length; i++) {
        gameCanvas.fillStyle = "#FFFFFF";
        gameCanvas.fillRect(bullets[i].x, bullets[i].y, 2, 10);
    }
}
function updateBullets() {
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].y -= 5;
        if (bullets[i].y < 0) {
            bullets.splice(i, 1);
        }
    }
}
const deathSounds = [
    "/assets/sounds/fart12.mp3",
    "/assets/sounds/whistle13.mp3",
    "/assets/sounds/whistle1.mp3",
    "/assets/sounds/fart27.mp3",
];
function collisionDetection() {
    for (let i = 0; i < bullets.length; i++) {
        for (let j = 0; j < aliens.length; j++) {
            if (bullets[i] && aliens[j]) {
                if (bullets[i].x < aliens[j].x + aliens[j].width &&
                    bullets[i].x + bullets[i].width > aliens[j].x &&
                    bullets[i].y < aliens[j].y + aliens[j].height &&
                    bullets[i].y + bullets[i].height > aliens[j].y) {
                    aliens[j].health++;
                    bullets.splice(i, 1);
                    if (aliens[j].health === 3) {
                        aliens[j].destroyed = true;
                        const soundIndex = Math.floor(Math.random() * deathSounds.length);
                        const deathSound = new Audio(deathSounds[soundIndex]);
                        deathSound.play();
                    }
                }
            }
        }
    }
}
function alienDeath() {
    const randomSound = deathSounds[Math.floor(Math.random() * deathSounds.length)];
    const audio = new Audio(randomSound);
    audio.play();
}
document.addEventListener("keydown", function (event) {
    switch (event.key) {
        case " ":
            fireProjectile();
            bullets.push({
                x: player.x,
                y: player.y,
                width: 5,
                height: 15,
                color: "#ff0000",
                speed: 10,
            });
            break;
    }
});
document.addEventListener("mousedown", function (event) {
    switch (event.button) {
        case 0:
            fireProjectile();
            bullets.push({
                x: player.x,
                y: player.y,
                width: 5,
                height: 15,
                color: "#ff0000",
                speed: 10,
            });
            break;
    }
});
function gameLoop() {
    if (gameCanvas) {
        gameCanvas.fillStyle = "#000000";
        gameCanvas.fillRect(0, 0, canvas.width, canvas.height);
        createPlayer();
        createAlien();
        updatePlayer();
        createBullets();
        updateBullets();
        collisionDetection();
        requestAnimationFrame(gameLoop);
    }
}
gameLoop();
const gameOverImage = new Image();
gameOverImage.src = "/assets/images/loseImage.png";
const youWinImage = new Image();
youWinImage.src = "/assets/images/winImage.png";
