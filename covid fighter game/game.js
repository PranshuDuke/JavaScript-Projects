function load_images(){
    enemy_image = new Image;
    enemy_image.src = "Assets/v1.png";
    
    player_img = new Image;
    player_img.src = "Assets/superhero.png";
    
    gem_image = new Image;
    gem_image.src = "Assets/gem.png";
}

function init(){
    //define the objects that we will have in the game
    canvas = document.getElementById("mycanvas");
    W = 700;
    H = 400;
    
    canvas.width = W;
    canvas.height = H;
    
    //create a context
    pen = canvas.getContext('2d');
    
    game_over = false;
    
    e1 = {
        x:150,
        y:50,
        w:60,
        h:60,
        speed:20,
    }; 
    
    e2 = {
        x:300,
        y:150,
        w:60,
        h:60,
        speed:30,
    };
    
    e3 = {
        x:450,
        y:20,
        w:60,
        h:60,
        speed:40,
    };
    
    enemy = [e1,e2,e3];
    
    player = {
        x:20,
        y:H/2,
        w:60,
        h:60,
        speed:20,
        moving:false,
        health:00
    };
    gem = {
        x:W-100,
        y:H/2,
        w:60,
        h:60,
    };
    
    //listen to events on the canvas 
    canvas.addEventListener('mousedown',function(){
        console.log("Mouse Pressed");
        player.moving = true;
    });
    canvas.addEventListener('mouseup',function(){
        console.log("Mouse released");
        player.moving = false;
    });
}

function draw(){
    //clear the canvas area foe the old frame
    pen.clearRect(0,0,W,H);
    
    pen.fillStyle="red";
    for(let i=0;i<enemy.length;i++){
        pen.drawImage(enemy_image,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);
    }
    
    // draw the player
    pen.drawImage(player_img,player.x,player.y,player.w,player.h);
    //draw the gem
    pen.drawImage(gem_image,gem.x,gem.y,gem.w,gem.h);
   
    //score
    pen.fillStyle = "white";
    pen.fillText("Score " + player.health,10,10);
}

function isOverlap(rect1,rect2){
    if(rect1.x+10<rect2.x + rect2.w &&
      rect1.x + rect1.w > rect2.x &&
      rect1.y < rect2.y+ rect2.h &&
      rect1.y + rect1.h > rect2.y) {
        return true;
    }
    
    return false;
}

function update(){
    
    // if the player is moving
    if(player.moving == true)
    {
        player.x += player.speed;    
        player.health += 10;
    }
    
    //overlap with enemy
    for(let i=0;i<enemy.length;i++)
        {
            if(isOverlap(enemy[i],player)){
                player.health -= 70;
                if(player.health <0){
                    game_over=true;
                    alert("Game over" + player.health);
                }
            }
        }
    
    //detect overlap with gem
    if(isOverlap(player,gem)){
        alert("You Won!");
        game_over=true;
        return;
    }
    //move the box downwards
    //update each enemy by same logic
    
    for(let i=0;i<enemy.length;i++){
        enemy[i].y += enemy[i].speed;
        if(enemy[i].y>H-enemy[i].h || enemy[i].y<0)
            {
                enemy[i].speed *= -1;
            }
    }
    
}

function gameLoop(){
    if(game_over==true)
        {
            clearInterval(f);
        }
    draw();
    update();
    
}
load_images();
init();
var f = setInterval(gameLoop,100);