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
    health:0,
    image: new Image(),
};
alien.image.onload = function() {
    gameCanvas.drawImage(alien.image, alien.x, alien.y, alien.width, alien.height);
};
alien.image.src = '/assets/images/alien.png';

// defining initial velocity
let vx = 2;
let vy = 1;

function createAlien() {
    // This chekcs if the alien has been destroyed or not.
    if (!alien.destroyed) {
    // update position based on velocity
    alien.x += vx;
    alien.y += vy;

    // check if alien hits left or right boundary
    if (alien.x - alien.width/2 < 0 || alien.x + alien.width/2 > canvas.width) {
        vx = -vx; // reverse x velocity
    }

    if (alien.y - alien.height/2 < 0 || alien.y + alien.height/2 > canvas.height / 2) {
        vy = -vy; // reverse y velocity
    }

    // keep the alien within the top half of the canvas
    if (alien.y > canvas.height / 4) {
        alien.y = canvas.height / 4;
        vy = -vy; // reverse y velocity to bounce back up
    }

    // draw the alien
    gameCanvas.drawImage(alien.image, alien.x - alien.width/2, alien.y - alien.height/2, alien.width, alien.height);
}};

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

// P R O J E C T I L E S //

// array to hold the bullets
let bullets = [];

// function to create bullets
function createBullets() {
  // loop through all the bullets and draw them on the canvas
for (let i = 0; i < bullets.length; i++) {
    gameCanvas.fillStyle = "#FFFFFF";
    gameCanvas.fillRect(bullets[i].x, bullets[i].y, 2, 10);
}
}

// function to update bullet position
function updateBullets() {
  // loop through all the bullets and update their positions
for (let i = 0; i < bullets.length; i++) {
    bullets[i].y -= 5;

    // remove the bullet from the array if it goes off the top of the screen
    if (bullets[i].y < 0) {
    bullets.splice(i, 1);
    }
}
}
//Collision detection 
function collisionDetection() {
    // loop through all the bullets and check for collisions with the alien
    for (let i = 0; i < bullets.length; i++) {
        if (bullets[i].x < alien.x + alien.width &&
            bullets[i].x + bullets[i].width > alien.x &&
            bullets[i].y < alien.y + alien.height &&
            bullets[i].y + bullets[i].height > alien.y) {
            // if a collision is detected, increment alien health and remove the bullet
            alien.health++;
            bullets.splice(i, 1);

            // if the alien has been hit by 3 bullets, set to indicate that it has been destroyed
            if (alien.health === 3) {
                alien.destroyed = true;
            }
        }
    }
}

// listen for space bar key press
document.addEventListener("keydown", function(event) {
    switch (event.key) {
      case " ": // Space bar key
        bullets.push({
        x: player.x,
        y: player.y,
        width: 5,
        height: 15,
        color: "#ff0000",
        speed: 10
        });
        break;
    }});
// adding the option of using your left click to fire
    document.addEventListener("mousedown", function(event) {
        switch (event.button) {
          case 0: // Left mouse button
            bullets.push({
            x: player.x,
            y: player.y,
            width: 5,
            height: 15,
            color: "#ff0000",
            speed: 10
            });
            break;
        }
    });
    
    function gameLoop() {
        // set the canvas fill color to black
        gameCanvas.fillStyle = "#000000";
        
        // render the background
        gameCanvas.fillRect(0, 0, canvas.width, canvas.height);
        
        // update and render game objects
        createPlayer();
        createAlien();
        updatePlayer();
        createBullets();
        updateBullets();
        collisionDetection();
        
        // schedule the next frame
        requestAnimationFrame(gameLoop);
    }
gameLoop();