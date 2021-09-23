let tileSize = 32;
let tileWidth, tileHeight;
let player, world, camera;

function preload() {
  let grassImage = loadImage("./assets/GrassImage.jpeg");
  let sandImage = loadImage("./assets/SandImage.jpeg");
  let waterImage = loadImage("./assets/WaterImage.jpeg");
  let conveyorImage = loadImage("./assets/ConveyorImage.png");

  // Terrain Tiles
  grassImage.resize(tileSize, tileSize);
  sandImage.resize(tileSize, tileSize);
  waterImage.resize(tileSize, tileSize);

  // Machines
  conveyorImage.resize(tileSize, tileSize);

  // Terrain Tiles
  Tile.Tiles[0x000000] = grassImage;
  Tile.Tiles[0x000001] = sandImage;
  Tile.Tiles[0x000002] = waterImage;

  // Machines
  Tile.Tiles[0x100000] = conveyorImage;
}

function setup() {
  createCanvas(1080, 720);

  TerrainGenrator.setup();

  camera = new Camera(0, 0);

  tileWidth = Math.floor(width / tileSize);
  tileHeight = Math.floor(height / tileSize);

  world = new World(tileWidth, tileHeight);
  player = new Player(Math.floor(tileWidth / 2) * tileSize, Math.floor(tileHeight / 2) * tileSize);
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

// <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js" integrity="sha512-N4kV7GkNv7QR7RX9YF/olywyIgIwNvfEe2nZtfyj73HdjCUkAfOBDbcuJ/cTaN04JKRnw1YG1wnUyNKMsNgg3g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
