const canvas = document.getElementById("gameCanvas");
const gameCanvas = canvas.getContext("2d");
//Setting the total game run time to 15 sec
let gameTime = 0;
setInterval(function(){
    gameTime++;
}, 2000);

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

// Created an 'aliens' array to store multiple alien objects
let aliens = []
let alien = {
	x: 100,
	y: 50,
	width: 50,
	height: 50,
	health: 0,
	image: new Image(),
}
alien.image.src = '/assets/images/alien.png'

// defining initial velocity
let vx = 0.5
let vy = 0.5

// creating # of newAlien objects and pushing them to the 'aliens' array. 
for (let i = 0; i < 10; i++) {
	let newAlien = Object.assign({}, alien)
	// this creates a 'newAlien' object that has the same paramaters as 'alien' object defined above. but we're just addding 
	// new x, y, and direction params 
	newAlien.x = Math.random() * (canvas.width - newAlien.width)
	newAlien.y = Math.random() * (canvas.height - newAlien.height)
	newAlien.directionX = Math.random() < 0.5 ? -1 : 1
	newAlien.directionY = Math.random() < 0.5 ? -1 : 1

	aliens.push(newAlien)
}

function createAlien() {
    let aliensRemaining = 0; // 
// wrapped if statements in for loop that iterates over whatever number of aliens u set on line 43
	for (let i = 0; i < aliens.length; i++) {
		// Check if the alien has reached the edges of the canvas
		if (!aliens[i].destroyed) {
            aliensRemaining++;
			let currentAlien = aliens[i]

			currentAlien.x += vx * currentAlien.directionX
			currentAlien.y += vy * currentAlien.directionY

			if (
				currentAlien.x < 0 ||
				currentAlien.x > canvas.width - currentAlien.width
			) {
				vx = -vx // reverse direction if alien hits left or right wall
			}

			if (
				currentAlien.y < 0 ||
				currentAlien.y > canvas.height - currentAlien.height
			) {
				vy = -vy
			}
			// keep the alien within the top half of the canvas
			if (currentAlien.y > canvas.height / 4) {
				currentAlien.y = canvas.height / 4
				vy = -vy // reverse y velocity to bounce back up
			}
			// Fix: use currentAlien.image instead of alien.image
            gameCanvas.drawImage(currentAlien.image, currentAlien.x, currentAlien.y, currentAlien.width, currentAlien.height);
			
		}
	}
    if (aliensRemaining === 0) {
        // All aliens are destroyed, display "you win" image
        gameCanvas.drawImage(youWinImage, 0, 0, canvas.width, canvas.height);
    } else if (gameTime >= 10) {
        // Time is up, and some aliens remain, display "game over" image
        gameCanvas.drawImage(gameOverImage, 0, 0, canvas.width, canvas.height);
    }
}


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
// creating death sounds
const deathSounds = [
    "/assets/sounds/fart12",
    "/assets/sounds/whistle13",
    "/assets/sounds/whistle1",
    "/assets/sounds/fart27",
];
//creating a laser sound effect
function playLaserSound() {
    const audio = new Audio('/assets/sounds/laserpew.ogg');
    audio.play();
}
function fireProjectile() {
    playLaserSound();
}

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
    for (let i = 0; i < bullets.length; i++) {
        for (let j = 0; j < aliens.length; j++) {
            if (bullets[i] && aliens[j]) { //added a check if bullets[i] and aliens[j] exist to the loop
                if (bullets[i].x < aliens[j].x + aliens[j].width &&
                    bullets[i].x + bullets[i].width > aliens[j].x &&
                    bullets[i].y < aliens[j].y + aliens[j].height &&
                    bullets[i].y + bullets[i].height > aliens[j].y) {
                    aliens[j].health++; // increment the health of the hit alien
                    bullets.splice(i, 1); // remove the bullet that hit the alien

                    if (aliens[j].health === 3) { // if the alien has been hit 3 times
                        aliens[j].destroyed = true; // set the destroyed flag to true
                        const soundIndex = Math.floor(Math.random() * deathSounds.length); 
                        const deathSound = new Audio(deathSounds[soundIndex] + ".mp3"); 
                        deathSound.play(); 
                    }
                }
            }
        }
    }
}

// When the alien dies, randomly select and play a sound effect
function alienDeath() {
    const randomSound = deathSounds[Math.floor(Math.random() * deathSounds.length)];
    const audio = new Audio(randomSound);
    audio.play();}

// listen for space bar key press
document.addEventListener("keydown", function(event) {
    switch (event.key) {
      case " ": // Space bar key
      //this calls the projectile sound from the function on space
        fireProjectile();
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
          //this calls the projectile sound from the function on click
            fireProjectile();
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

const gameOverImage = new Image();
gameOverImage.src = "/assets/images/loseImage.png";
const youWinImage = new Image();
youWinImage.src = "/assets/images/winImage.png";