let tileSize = 16;
let tileWidth, tileHeight;
let player, world, camera;

function preload() {
  grassImage = loadImage("./assets/GrassImage.jpeg");
  sandImage = loadImage("./assets/SandImage.jpeg");
  waterImage = loadImage("./assets/WaterImage.jpeg");
}

function setup() {
  createCanvas(1080, 720);

  TerrainGeneration.setup();

  camera = new Camera(0, 0);

  tileWidth = floor(width / tileSize);
  tileHeight = floor(height / tileSize);

  world = new World("");
  player = new Player(floor(tileWidth / 2) * tileSize, floor(tileHeight / 2) * tileSize);
}

function draw() {
  background(0);

  player.update();
  camera.centerOnPlayer(player);
  world.update();

  world.draw();
  player.draw();

  Debug.drawFramerate();
}