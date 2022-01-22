const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let speed = 7;
let tileCount = 20;
// let tileSize = canvas.Width / tileCount - 2;
// let headX = 10;
// let headY = 10;
let score = 0;

let xVelocity=0;
let yVelocity=0;
class SnakePart {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

const snakeParts = [];
let tailLength = 2;
var apple = {
    appleX : 5,
    appleY : 5
};

var data = {
    headX:10,
    headY:10,
    tileCount: 20,
    tileSize: 18
    
};
// game loop
// requestAnimationFrame
//setInterval xtimes per a second (keep calling the f(x))
//setTimeOut
function drawGame (){
    let result = isGameOver();
    if(result){
        return;
    }
clearScreen();
changeSnakePosition();
checkAppleCollision();
drawSnake ();
drawApple ();
drawScore();
setTimeout(drawGame, 1000/ speed);

}

function isGameOver (){
    let gameOver = false;

    // if(xVelocity == 0 && yVelocity == 0){
    //     return false;
    // }
    //walls

    if(data.headX < 0 || data.headY < 0 || data.headX == data.tileCount ||  data.headY == data.tileCount ){
        gameOver = true;
    }
    //body collision
    // for (i=0; i<snakeParts.length; i++){
    //     let part = snakeParts[i];
    //     if (part.x == data.headX && part.y == data.headY){
    //         gameOver = true;
    //         break;
    //     }
    // }
    if (gameOver){
        ctx.fillStyle = "white";
        ctx.font = "40px Verdana";

        ctx.fillText("Game Over! 😁", canvas.width / 6.5, canvas.height / 2);
    }
    return gameOver;
}

function drawScore(){
    ctx.fillStyle = "white";
    ctx.font = "10px Verdana";
    ctx.fillText("score " + score, canvas.width-50, 10);
}
function clearScreen (){
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.clientWidth,canvas.height);
};
function drawSnake (){
     
    
 // other body of the snake
    ctx.fillStyle = "green";
    for(let i=0; i<snakeParts.length; i++) {
        let part = snakeParts[i];
        ctx.fillRect(part.x * data.tileCount, part.y * data.tileCount, data.tileSize, data.tileSize);

    }
    // put an item next to the head
    snakeParts.push(new SnakePart(data.headX, data.headY))
    while (snakeParts.length > tailLength){
        snakeParts.shift(); // remove the last item from the snake part if we have more than theh snake length
     }
     ctx.fillStyle = "orange";
     ctx.fillRect(data.headX * data.tileCount, data.headY * data.tileCount, data.tileSize, data.tileSize);
    };

 

function changeSnakePosition (){
    data.headX = data.headX + xVelocity;
    data.headY = data.headY + yVelocity;
}

function drawApple(){
     ctx.fillStyle = "red";
     ctx.fillRect(apple.appleX * data.tileCount, apple.appleY * data.tileCount, data.tileSize, data.tileSize);
 }

 function checkAppleCollision () {
     if(apple.appleX == data.headX && apple.appleY == data.headY){
         apple.appleX = Math.floor (Math.random() * data.tileCount);
         apple.appleY = Math.floor (Math.random () * data.tileCount);
         tailLength++;
         score++;
     }
 }
document.addEventListener("keydown", keyDown);

function keyDown (e) {
    //up
    if (e.keyCode == 38){
        //if the snake is going down, it can't goes up again
        if(yVelocity ==1 )
        return;
        yVelocity = -1;
        xVelocity = 0;
    } else if (e.keyCode == 40){
        //if the snake is going up, it can't goes down again
        if(yVelocity == -1 )
        return;
        // down
        yVelocity =1 ;
        xVelocity = 0;
    } else if (e.keyCode == 37){
        //if the snake is going right, it can't goes left again
        if(xVelocity == 1 )
        return;
        // left
        yVelocity = 0;
        xVelocity = -1;
    }
    else if (e.keyCode == 39){
        //if the snake is going left, it can't goes right again
        if(xVelocity == -1 )
        return;
        // right
        yVelocity = 0 ;
        xVelocity = 1;
    }
    
}
 //document.body.addEventListener('keydown', keyDown);

 drawGame();