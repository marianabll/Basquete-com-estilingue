const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var solo, tabela;
var jogador, bola, estilingue;
var quadra, bolaImg, jogadorImg;
var reset;
var placar = 0;

function preload(){
  quadra = loadImage("assets/quadra.jpeg");
  bolaImg = loadImage("assets/bola.png");
  jogadorImg = loadImage("assets/um.png")
}

function setup() {
  createCanvas(1000,640);
  engine = Engine.create();
  world = engine.world;

  reset = createImg("assets/reset.png")
  reset.position(900,80)
  reset.size(50,50)
  //reset.mouseClicked(recarregar)
 
  solo = Bodies.rectangle(500,500,1000,1, {isStatic: true});
  World.add(world, solo)

  tabela = Bodies.rectangle(915, 245, 50, 55, { isStatic: true });
  World.add(world, tabela);
  
  bola = Bodies.circle(490,250,25, {restitution: 0.8});
  World.add(world, bola);
  
  estilingue = new Estilingue(this.bola, {x:490, y:250});

  jogador = createSprite(500,400);
  jogador.addImage(jogadorImg)
  jogador.scale = 0.4

}
function draw() {
  background(quadra); 
  Engine.update(engine);

  estilingue.display();

  drawSprites()

  imageMode(CENTER)
  image(bolaImg, bola.position.x, bola.position.y, 50, 50);

  push();
  translate(tabela.position.x, tabela.position.y)
  rotate(25)
  rectMode(CENTER);
  rect(0, 0, 60, 55);
  pop();

  var colisao = Matter.SAT.collides(bola, tabela)

  if (colisao.collided) {
    placar += 3
  }

  textSize(20)
  text(placar, 455,135)
}


function mouseDragged(){
  Matter.Body.setPosition(this.bola, {x: mouseX, y: mouseY});
}


function mouseReleased(){
  estilingue.fly();
}
