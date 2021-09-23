class Machine {
  constructor(x, y, machineType) {
    this.worldX = x;
    this.worldY = y;
    this.tileType = machineType;

    this.tileWidth = 1;
    this.tileHeight = 1;

    this.highlight = false;

    this.direction = Machine.placeDirection;

    if (World.placeAngle == 0) {
      this.direction = createVector(0, -1);
    } else if (World.placeAngle == 90) {
      this.direction = createVector(1, 0);
    } else if (World.placeAngle == 180) {
      this.direction = createVector(0, 1);
    } else if (World.placeAngle == 270) {
      this.direction = createVector(-1, 0);
    }

    this.drawAngle = World.placeAngle;
  }

  draw(x, y) {
    push();
    imageMode(CENTER);
    translate(x + tileSize / 2, y + tileSize / 2);
    //image(img, 0, 0, obj.w, obj.h);
    rotate(this.drawAngle);
    translate(-(x + tileSize / 2), -(y + tileSize / 2));
    imageMode(CORNER);
    image(Tile.Tiles[this.tileType], x, y, tileSize, tileSize);
    pop();
  }
}

class Conveyor extends Machine {
  static Type = 0x100000;

  #items = [];

  constructor(tile) {
    super(tile.x, tile.y, Conveyor.Type);

    this.tileWidth = 1;
    this.tileHeight = 1;

    this.tile = tile;

    this.tile.tileType = Conveyor.Type;
    this.#items = [];
  }

  update() {}
}
