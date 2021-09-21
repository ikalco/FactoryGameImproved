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
    this.pos = createVector(x, y);
    this.speed = 1;
    print(this.speed)

    this.color = color(random(0, 255), random(0, 255), random(0, 255));
  }

  update() {
    if (Player.keysPressed.w) this.pos.y -= this.speed;
    if (Player.keysPressed.s) this.pos.y += this.speed;
    if (Player.keysPressed.a) this.pos.x -= this.speed;
    if (Player.keysPressed.d) this.pos.x += this.speed;
  }

  draw() {
    push();
    fill(this.color);
    rect(parseInt(tileWidth / 2) * tileSize, parseInt(tileHeight / 2) * tileSize, tileSize, tileSize);
    pop();
  }
}
