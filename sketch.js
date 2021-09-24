let tileSize = 32;
let tileWidth, tileHeight;
let player, world, camera;
let atlasImage;

function preload() {
  atlasImage = loadImage("./assets/atlas.png");
}

function setup() {
  createCanvas(1080, 720);

  // To be able to right click delete a block
  document.addEventListener('contextmenu', event => event.preventDefault());

  // Terrain Tiles
  let grassImage = atlasImage.get(0, 0, 32, 32);
  let sandImage = atlasImage.get(32, 0, 32, 32);
  let waterImage = atlasImage.get(64, 0, 32, 32);

  // Machines
  let conveyorImage = atlasImage.get(96, 0, 32, 32);

  // Terrain Tiles
  Tile.Tiles[0x000000] = grassImage;
  Tile.Tiles[0x000001] = sandImage;
  Tile.Tiles[0x000002] = waterImage;

  // Machines
  Tile.Tiles[0x100000] = conveyorImage;

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
