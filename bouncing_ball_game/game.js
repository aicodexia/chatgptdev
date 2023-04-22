var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.style.backgroundColor = "black";
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var ballRadius = 10;

// define the blocks
var blockRowCount = 7;
var blockColumnCount = 6;
var blockWidth = 60;
var blockHeight = 20;
var blockPadding = 10;
var blockOffsetTop = 30;
var blockOffsetLeft = 30;

var blocks = [];
for(var c=0; c<blockColumnCount; c++) {
    blocks[c] = [];
    for(var r=0; r<blockRowCount; r++) {
        blocks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    var grd = ctx.createRadialGradient(x, y, 0, x, y, ballRadius);
    grd.addColorStop(0, '#ffffff');
    grd.addColorStop(1, '#0095DD');
    ctx.fillStyle = grd;
    ctx.shadowColor = '#0095DD';
    ctx.shadowBlur = 20;
    ctx.fill();
    ctx.closePath();
}
  
var blockColors = ["#FF5733", "#C70039", "#900C3F", "#581845", "#FFC300", "#FF5733"];

var score = 0;

function drawBlocks() {
    for(var c=0; c<blockColumnCount; c++) {
        for(var r=0; r<blockRowCount; r++) {
            if (blocks[c][r].status == 1) {
                var blockX = (c*(blockWidth+blockPadding))+blockOffsetLeft;
                var blockY = (r*(blockHeight+blockPadding))+blockOffsetTop;
                blocks[c][r].x = blockX;
                blocks[c][r].y = blockY;
                var colorIndex = Math.floor(Math.random() * blockColors.length);
                var blockColor = blockColors[colorIndex];
                ctx.beginPath();
                ctx.rect(blockX, blockY, blockWidth, blockHeight);
                ctx.fillStyle = blockColor;
                ctx.fill();
                ctx.closePath();
            }
        } 
    }
}
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}
function collisionDetection() {
    for(var c=0; c<blockColumnCount; c++) {
        for(var r=0; r<blockRowCount; r++) {
            var block = blocks[c][r];
            if (block.status == 1) {
                if(x > block.x && x < block.x+blockWidth && y > block.y && y < block.y+blockHeight) {
                    dy = -dy;
                    block.status = 0;
                    score++;
                }
            }
        }
    }
}
  
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
  

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawBlocks();
    drawScore();
    collisionDetection();
    drawPaddle();
  
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    } 
    else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval); // Needed for Chrome to end game
        }
    }
  
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    x += dx;
    y += dy;
}
  
var rightPressed = false;
var leftPressed = false;
  
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
  
function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}
  
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

var interval = setInterval(draw, 10);
