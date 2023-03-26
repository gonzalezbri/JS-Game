const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

//creating the Player//
const player = {
    x: canvas.width/2,
    y: canvas.height - 50,
    width: 50,
    height: 50,
    image: new Image(),
};
player.image.src = '/assets/images/player.png';
player.image.onload = function() {
    ctx.drawImage(player.image, player.x - player.width/2, player.y - player.height/2, player.width, player.height);
}
function createPlayer() {
    ctx.drawImage(player.image, player.x - player.width/2, player.y - player.height/2, player.width, player.height);
}

//creating the Alien

const alien = {
    x: 100,
    y: 50,
    width: 50,
    height: 50,
    image: new Image(),
};
alien.image.onload = function() {
    ctx.drawImage(alien.image, alien.x, alien.y, alien.width, alien.height);
};
alien.image.src = '/assets/images/alien.jpg';
function createAlien() {
    ctx.drawImage(alien.image, alien.x - alien.width/2, alien.y - alien.height/2, alien.width, alien.height);
}
