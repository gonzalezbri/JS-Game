# JS-Game
Creating my Javascripte Milestone Game

1. Setup the HTML file with a canvas element as well as my JS script and CSS stylesheet.
2. Create the player object and Alien object using 'x','y','width' and with 'Image' properties using free assets from opengameart.org then 'Drawing' them both onto the 'canvas'
3. Allow the player to move left & right using the keyboard input ('Left & Right Arrow' Keys OR 'A'&'D') to update the 'x' position accordingly.
4. Create a game loop that updates the game by rendering black background and calling 'updatePlayer' place the locationg accoordingly. then clears my canvas using 'clearRect' to render the next frame, call 'createPlayer' & 'createAlien', As well as using a 'setTimeout' to call the gameloop after a short 10ms delay.
5. Implement shooting: Allowing the player to create bullet objects that move and down the screen as well as a collision detector function for when it hits the alien. I added '3' health as to give the alien some sense of resilience that will eventually be give off a sound to tell the player that he has hit the alien and a different sound will play to signal the alien is dead.
6. Adding multiple aliens and making the alien move within the game window and bounce from the boundary to create a sort of 'DVD VIDEO' style loop by adding velocity.
8. Adding a timer that signals wether you win or lose by destroying all of the aliens within 10 seconds
9. Implement a GAME OVER mechanic
10. Extra Styling and sound effects using sound constructors.






CITES:
Player Ship:https://opengameart.org/content/spaceship-tutorial-0

Alien:https://opengameart.org/content/jumping-galaxy-asset-cc-by-30

Sounds:(fart sounds) : https://sfx.productioncrate.com/search/#!/fart&ss=tab&_ga=2.106241603.113615241.1680459407-219726450.1680459407&_gl=1*1bzwfxy*_ga*MjE5NzI2NDUwLjE2ODA0NTk0MDc.*_ga_NHS4EFR3W8*MTY4MDQ1OTQwNy4xLjEuMTY4MDQ1OTc3Ni4wLjAuMA..
(laser sounds) : https://opengameart.org/content/pew-laser-fire-sound

script.js line 17:https://stackoverflow.com/questions/12354865/image-onload-event-and-browser-cache

interval script: https://stackoverflow.com/questions/64321054/how-to-use-settimeout-and-setinterval-to-display-html-content

StackOverflow(https://stackoverflow.blog/2019/11/06/lets-get-graphic-a-few-ways-to-draw-on-the-web/ & https://stackoverflow.com/questions/60238728/html-canvas-problems-with-context-drawimage) that '2D rendering context' can be used on the canvas to draw and remove graphics

bullet/collision cites: https://stackoverflow.com/questions/74094203/i-cant-figure-out-how-to-make-my-loop-work-in-my-space-invader-like-game-in-java, https://codeheir.com/2019/03/17/how-to-code-space-invaders-1978-7/