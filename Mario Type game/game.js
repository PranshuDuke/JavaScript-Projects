let config = {
    type:Phaser.AUTO,
    
    scale: {
        mode:Phaser.Scale.FIT,
        width:800,
        height:600,
    },
    
    backgroundColor : 0xffffcc,
    
    physics: {
        default: 'arcade',
        arcade:{
            gravity:{
                y:1000,
                
            }
        }
    },
    
    scene : {
        preload:preload,
        create:create,
        update:update,
    }
};

let game = new Phaser.Game(config);

let player_config = {
    player_speed : 150,
    player_jumpspeed : -700,
};
//this.score = 0;
//this.scoreText = null;
function preload(){
    this.load.image("ground","Assets/topground.png");
    this.load.image("sky","Assets/background.png");
    this.load.spritesheet("dude","Assets/dude.png",{frameWidth:32,frameHeight:48}); 
    this.load.image("apple","Assets/apple.png");
    this.load.image("ray","Assets/ray.png");
}

function create(){
    W = game.config.width;
    H = game.config.height;
    
    //add tilesprite
    let ground = this.add.tileSprite(0,H-128,W,128,'ground');
    ground.setOrigin(0,0);//before the origin of the image was it's center and by doing this we set the origin of the image at the left  most upper corner
    
    //try to create a background
    let background = this.add.sprite(0,0,'sky');
    background.setOrigin(0,0);
    background.displayWidth = W;
    background.displayHeight = H;
    background.depth = -1;

    //create rays on the top of the background
    let rays =[];
    for(let i=-10;i<=10;i++){
        let ray = this.add.sprite(W/2,H-108,'ray');
        ray.displayHeight = 1.2*H;
        ray.setOrigin(0.5,1);
        ray.alpha = 0.2;
        ray.angle = i*10;
        ray.depth = -1;
        rays.push(ray);
    }
    
    //tween
    this.tweens.add({
        targets: rays,
            props:{
                angle:{
                    value : "+=20",
                },
            },
                duration:600,
                repeat : -1,
    });
    
    
    //we r using this cuz i might need to update the player
    this.player = this.physics.add.sprite(100,100,'dude',4);
    //set the bounce
    this.player.setBounce(0.3);
    
    //don't allow the player to go outside the world
    this.player.setCollideWorldBounds(true);
    
    //player animations and player movements
    this.anims.create({
        key : 'left',
        frames : this.anims.generateFrameNumbers('dude',{start:0,end:3}),
        frameRate : 10,
        repeat : -1
    });
    
    this.anims.create({
        key : 'center',
        frames : this.anims.generateFrameNumbers('dude',{start:4,end:4}),
        frameRate : 10,
    });
    
    this.anims.create({
        key : 'right',
        frames : this.anims.generateFrameNumbers('dude',{start:5,end:8}),
        frameRate : 10,
        repeat : -1
    });
    
    
    //keybord
    this.cursors = this.input.keyboard.createCursorKeys();
    
    //add a group of apples = physics object
    let fruits = this.physics.add.group({
        key: "apple",
        repeat : 8,
        setScale: {x:0.2,y:0.2},
        setXY : {x:10,y:0,stepX:100},
    });
    
    //add bouncing effect to all the apples
    fruits.children.iterate(function(f){
        f.setBounce(Phaser.Math.FloatBetween(0.4,0.55));
    });
    
    //create more platforms
    let platform = this.physics.add.staticGroup();
    platform.create(550,350,'ground').setScale(2,0.5).refreshBody();
    platform.create(700,150,'ground').setScale(2,0.5).refreshBody();
    platform.create(100,200,'ground').setScale(2,0.5).refreshBody();
    
    platform.add(ground);
    
    
    
    //add physics to ground also
    this.physics.add.existing(ground);
    //ground.body.allowGravity = false;
    
    //ground.body.immovable=true;
    
    //add a collision detection b/w player and ground
    //this.physics.add.collider(ground,this.player);
    this.physics.add.collider(platform,this.player);
    this.physics.add.collider(platform,fruits);
    //to detect the over lap of player with the fruit
    this.physics.add.overlap(this.player,fruits,eatFruit,null,this);
    
    
    //create cameras
    this.cameras.main.setBounds(0,0,W,H);
    this.physics.world.setBounds(0,0,W,H);
    
    this.cameras.main.startFollow(this.player,true,true);
    this.cameras.main.setZoom(1.4);
    
    //create score
    //this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    
    //create score
    //this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    //this.scoreText.setText('v15');
   // this.scoreText.setText('Score: ' + this.score);
    
}

function update(){
    
    if(this.cursors.left.isDown){
        this.player.setVelocityX(-player_config.player_speed);
        this.player.anims.play('left',true);
    }
    else if(this.cursors.right.isDown){
        this.player.setVelocityX(player_config.player_speed);
        this.player.anims.play('right',true);
    }
    else{
        this.player.setVelocityX(0);
        this.player.anims.play('center',true);
    }
    
    //add jumping ability, stop the player when in air
    if(this.cursors.up.isDown && this.player.body.touching.down){
        this.player.setVelocityY(player_config.player_jumpspeed)
    }
    
    //this.scoreText.setText('Score: ' + this.score);
    
}

function eatFruit(player,fruit){
    fruit.disableBody(true,true);
}