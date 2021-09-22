function keyPressed() {
  if (key == "w") Player.keysPressed.w = true;
  if (key == "s") Player.keysPressed.s = true;
  if (key == "a") Player.keysPressed.a = true;
  if (key == "d") Player.keysPressed.d = true;
}

function keyReleased() {
  if (key == "w") Player.keysPressed.w = false;
  if (key == "s") Player.keysPressed.s = false;
  if (key == "a") Player.keysPressed.a = false;
  if (key == "d") Player.keysPressed.d = false;
}

class Player {
  static keysPressed = {};

  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.speed = 5;

    this.color = color(random(0, 255), random(0, 255), random(0, 255));
  }

  update() {
    if (Player.keysPressed.w) this.y -= this.speed;
    if (Player.keysPressed.s) this.y += this.speed;
    if (Player.keysPressed.a) this.x -= this.speed;
    if (Player.keysPressed.d) this.x += this.speed;
  }

  draw() {
    fill(this.color);
    //rect(0, 0, tileSize, tileSize);
    rect(floor(this.x - camera.getXOffset()), floor(this.y - camera.getYOffset()), tileSize, tileSize);
  }
}
