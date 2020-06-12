//Hello World of phaser = BAsic Game + single scene in spin and win game

let prizes_config = {
    count: 12,
    prize_names : ["3000 Credits","35% Off","Hard Luck","70% OFF","Swagpack","100% OFF","Netflix Subs.","50% OFF","Amazon Voucher","2 Extra Spin","CB Tshirt","CB Book"]
}

let config = {
    type : Phaser.CANVAS,
    width : 800,
    height : 600,
    backgroundColor : 0xffcc00,
    
    scene : {
        preload : preload,
        create : create,
        update : update,
    }
};
 let game = new Phaser.Game(config);

function preload(){
    //load object, load some images
    this.load.image('background','C:/Users/DELL/Desktop/JavaScript Project/spin and win/Assets/back.jpg');
    this.load.image('wheel','C:/Users/DELL/Desktop/JavaScript Project/spin and win/Assets/wheel.png');
    this.load.image('pin','C:/Users/DELL/Desktop/JavaScript Project/spin and win/Assets/pin.png');
    this.load.image('stand','C:/Users/DELL/Desktop/JavaScript Project/spin and win/Assets/stand.png');
}

function create(){
    //create the background image 
    let W = game.config.width;
    let H = game.config.height;
    
    let background = this.add.sprite(0,0,'background');
    background.setPosition(W/2,H/2);
    background.setScale(0.20);
    
    //create the stand
    let stand = this.add.sprite(W/2,H/2+200,"stand");
    stand.setScale(0.25);
    
    //create a wheel
    //we used this here to make the wheel variable a part of the scene so that we can use it in other functions
    this.wheel = this.add.sprite(W/2,H/2,"wheel");
    this.wheel.setScale(0.20);
    
    //create a pin
    let pin = this.add.sprite(W/2,H/2-200,"pin");
    pin.setScale(0.20);
    
    //we can use depth for ensuring that which picture will come upward and which pic will come downward
    
    
    //we can use scaleX to increase or decrease the scale of the pic along x-axis. Similarly for y-axis
    
    //for transperacy we can use this.wheel.alpha = 0.5 which means tanspreracy is reduced by the factor 0.5
    
    //event listener for mouse click
    this.input.on("pointerdown",spinwheel,this);
    
    //lets create text object
    font_style = {
        font : "bold 30px Arial",
        align : "center",
        color : "red",
    }
    this.game_text = this.add.text(10,10,"Welcome to Spin & Win",font_style);
     
}

//Game loop
function update(){
    //this.wheel.angle +=1;
}

function spinwheel(){
    console.log("You clicked the mouse");
    console.log("Start spinning");
    
    //this.game_text.setText("You Clicked The Mouse!!");
    
    let rounds = Phaser.Math.Between(2,4);
    let degrees = Phaser.Math.Between(0,11)*30;
    
    let total_angle = rounds*360 + degrees;
    console.log(total_angle);
    
    let idx = prizes_config.count-1-Math.floor(degrees/(360/prizes_config.count));
    
    tween = this.tweens.add({
        targets: this.wheel,
        angle: total_angle,//we have to change this number randomly
        ease: "Cubic.easeOut",
        duration : 6000,
        callbackScope:this,
        onComplete: function(){
            this.game_text.setText("You won " + prizes_config.prize_names[idx]);
        }
    });
}