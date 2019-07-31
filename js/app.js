// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    this.x = x;
    this.y = y;
    this.speed = speed;

    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x >= 605) {
        this.x = -100;
    }
    for (let bug of allEnemies) {
        if ((bug.x > (player.x - 60) && bug.x < (player.x + 60) ) && 
        bug.y === player.y) {
            player.reset();
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/char-boy.png';
    }
    update() {
    };
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
    handleInput(e) {
        switch(e) {
            case 'up':
                if (this.y > 0) {
                    this.y -= 83;
                }
                break;
            case 'down':
                if (this.y < 355) {
                    this.y += 83;
                }
                break;
            case 'left':
                if (this.x > 0) {
                    this.x -= 101;
                }
                break;
            case 'right':
                if (this.x < 306) {
                    this.x += 101;
                }
                break;
        }
        if (this.y < 50) {
            setTimeout(function() {
                player.reset();
            }, 200);
        }
    }
    reset() {
            this.x = 200;
            this.y = 405;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const allEnemies = [];
const bugOne = new Enemy(-100,73, 180);
const bugTwo = new Enemy(-100,156, 300);
const bugThree = new Enemy(-500,156,300);
const bugFour = new Enemy(-100,239,230);
allEnemies.push(bugOne, bugTwo, bugThree, bugFour);

// Place the player object in a variable called player
const player = new Player(200,405,100);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});