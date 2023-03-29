const canvas = document.getElementById("gameCanvas");
const gameCanvas = canvas.getContext("2d");

//creating the background
gameCanvas.fillStyle = "#000000";
gameCanvas.fillRect(0, 0, canvas.width, canvas.height);

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
    gameCanvas.drawImage(player.image, player.x - player.width/2, player.y - player.height/2, player.width, player.height);
};
function createPlayer() {
    gameCanvas.drawImage(player.image, player.x - player.width/2, player.y - player.height/2, player.width, player.height);
};

//creating the Alien

const alien = {
    x: 100,
    y: 50,
    width: 50,
    height: 50,
    image: new Image(),
};
alien.image.onload = function() {
    gameCanvas.drawImage(alien.image, alien.x, alien.y, alien.width, alien.height);
};
alien.image.src = '/assets/images/alien.png';
function createAlien() {
    gameCanvas.drawImage(alien.image, alien.x - alien.width/2, alien.y - alien.height/2, alien.width, alien.height);
};

//making the player move//
let playerMovement = 0;

// event listener for arrow key presses
document.addEventListener('keydown',function(event){
    switch(event.key){
         // left arrow key
        case "ArrowLeft":
            playerMovement = -5;
            break;
        // right arrow key
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
// add event listener for arrow key releases
document.addEventListener("keyup", function(event) {
    switch (event.key) {
      // left or right arrow key
    case "ArrowLeft":
        case "a":
    case "ArrowRight":
        case "d":
        playerMovement = 0;
        break;
    }
});
// update player position based on movement
function updatePlayer() {
    player.x += playerMovement;
    if (player.x < player.width/2) {
    player.x = player.width/2;
    }
    if (player.x > canvas.width - player.width/2) {
    player.x = canvas.width - player.width/2;
    }
}
function gameLoop() {
    // set the canvas fill color to black
    gameCanvas.fillStyle = "#000000";
    
    // render the background
    gameCanvas.fillRect(0, 0, canvas.width, canvas.height);
    
    // update the player position based on movement
    updatePlayer();
    
    // render the game objects
    createPlayer();
    createAlien();
    
    // call the game loop again after 10ms
    setTimeout(gameLoop, 10);
}
gameLoop();