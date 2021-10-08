var gamestate= "Play"
var score=0

function preload(){
  Shooterimage=loadImage("images.png")
  BackGroundimage=loadImage("background.jpg")
}

function setup() {
  createCanvas(displayWidth,displayHeight);
  Shooter=createSprite(70,650)
  Shooter.addImage(Shooterimage)
  zombie= new Zombie(width,300)
  
 zombieGroup=new Group()
zombieGroup.add(zombie.body)
bulletGroup=new Group()

}

function draw() {
  background(BackGroundimage);  
  drawSprites();
  fill("white")
  text("Zombie's Kills" + score,width-300,50)

  if(gamestate==="Play"){
    if(frameCount%50===0){
      zombie= new Zombie(width,random(100,height-100))
      zombieGroup.add(zombie.body)
    }
      Shooter.y=mouseY
      if(keyDown("space") && frameCount%10===0){
        bullet= new Bullet (Shooter.x,Shooter.y)
        bulletGroup.add(bullet.body)
      }
    bulletGroup.collide(zombieGroup,kill)
    zombieGroup.collide(Shooter,GameOver)
  }
if(gamestate==="end"){
  textSize(40)
  text("GameOver",width/2,height/2)
  zombieGroup.setVelocityXEach(0)
}
}
function kill(bullets,zombies){
zombies.destroy()
bullets.destroy()
score++
}
function GameOver(zombie,shooter){
  gamestate= "end"
  shooter.destroy()
}