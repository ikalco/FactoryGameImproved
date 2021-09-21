let tileSize = 20;
let noiseScale = 0.05;
let buffer = 10;
let map = [];
let tileWidth, tileHeight, player;

function preload() {
  grassImage = loadImage("./assets/Grass.png");
}

function setup() {
  createCanvas(1080, 720);
  tileWidth = parseInt(width / tileSize) + 10;
  tileHeight = parseInt(height / tileSize) + 10;

  createMap();

  player = new Player(0, 0);
}

function draw() {
  background(0);
  drawMap();
  player.update();
  player.draw();
  drawFramerate();
}

function createMap() {
  for (let i = 0; i < tileWidth; i++) {
    map[i] = [];
    for (let j = 0; j < tileHeight; j++) {
      map[i][j] = getColor(i, j)
    }
  }
}

function drawMap() {
  push();
  noStroke();
  for (let i = 0; i < tileWidth; i++) {
    for (let j = 0; j < tileHeight; j++) {
      let img;
      if (map[i + parseInt(player.pos.x)]) {
        if (map[i + parseInt(player.pos.x)][j + parseInt(player.pos.y)]) {
          img = (map[i + parseInt(player.pos.x)][j + parseInt(player.pos.y)]);
        } else {
          map[i + parseInt(player.pos.x)][j + parseInt(player.pos.y)] = getColor(i + parseInt(player.pos.x), j + parseInt(player.pos.y));
          img = (map[i + parseInt(player.pos.x)][j + parseInt(player.pos.y)]);
        }
      } else {
        map[i + parseInt(player.pos.x)] = [];
        map[i + parseInt(player.pos.x)][j + parseInt(player.pos.y)] = getColor(i + parseInt(player.pos.x), j + parseInt(player.pos.y));
        img = (map[i + parseInt(player.pos.x)][j + parseInt(player.pos.y)]);
      }
      image(img, i * tileSize, j * tileSize, tileSize, tileSize);
    }
  }
  pop();
}

function getColor(i, j) {
  //const v = noise((i - 10000) * noiseScale, (j - 10000) * noiseScale);
  return grassImage;

  if (v < 0.3) {
    // water
    return color("#008dc4");
  } else if (v < 0.4) {
    // sand
    return color("#eecda3");
  } else /*if (v < 0.6)*/ {
    // grass
    return color("#7ec850");
  } /*else {
    // forest
    //return color("#69B23F");
  }*/
}