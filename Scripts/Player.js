function keyPressed() {
  Player.keysPressed[keyCode] = true;
}

function keyReleased() {
  Player.keysPressed[keyCode] = false;
  console.log(keyCode);
  if (keyCode == 82) {
    if (World.placeAngle == 270) World.placeAngle = 0;
    if (Player.keysPressed[16]) World.placeAngle -= HALF_PI;
    else World.placeAngle += HALF_PI;
  }
}

class Player {
  static keysPressed = {};

  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.speed = 5;

    this.color = color(Math.random() * 255, Math.random() * 255, Math.random() * 255);
  }

  update() {
    if (Player.keysPressed[87]) this.y -= this.speed;
    if (Player.keysPressed[83]) this.y += this.speed;
    if (Player.keysPressed[65]) this.x -= this.speed;
    if (Player.keysPressed[68]) this.x += this.speed;
  }

  draw() {
    fill(this.color);
    //rect(0, 0, tileSize, tileSize);
    rect(Math.floor(this.x - camera.getXOffset()), Math.floor(this.y - camera.getYOffset()), tileSize, tileSize);
  }
}
