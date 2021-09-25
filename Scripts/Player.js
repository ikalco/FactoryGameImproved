function keyPressed() {
  Player.keysPressed[keyCode] = true;
  if (keyCode == 82 && World.canRotate) {
    if (World.placeAngle == 270) World.placeAngle = 0;
    if (Player.keysPressed[16]) World.placeAngle -= HALF_PI;
    else World.placeAngle += HALF_PI;
    World.canRotate = false;
  }
}

function keyReleased() {
  Player.keysPressed[keyCode] = false;
  if (keyCode == 82) {
    World.canRotate = true;
  }
  if (keyCode >= 49 && keyCode <= 57) {
    player.inventory.selectItem(keyCode - 49);
    World.placeAngle = 0;
  }
  if (keyCode == 48) {
    player.inventory.selectItem(9);
  }
  if (keyCode == 81) {
    Inventory.canSelect = true;
  }
}

class Player {
  static keysPressed = {};

  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.speed = 5;

    this.color = color(Math.random() * 255, Math.random() * 255, Math.random() * 255);
    this.inventory = new Inventory(this);
  }

  update() {
    if (Player.keysPressed[87]) this.y -= this.speed;
    if (Player.keysPressed[83]) this.y += this.speed;
    if (Player.keysPressed[65]) this.x -= this.speed;
    if (Player.keysPressed[68]) this.x += this.speed;

    this.inventory.update();
  }

  draw() {
    fill(this.color);
    //rect(0, 0, tileSize, tileSize);
    rect(Math.floor(this.x - camera.getXOffset()), Math.floor(this.y - camera.getYOffset()), tileSize, tileSize);
    this.inventory.draw();
  }
}
