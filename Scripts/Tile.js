class Tile {
  static Tiles = [];

  constructor(x, y, tileType) {
    this.x = x;
    this.y = y;
    this.tileType = tileType;

    this.highlight = false;

    this.machine = null;
  }

  draw(x, y) {
    if (this.machine == null) {
      image(Tile.Tiles[this.tileType], x, y, tileSize, tileSize);
    } else {
      this.machine.draw(x, y);
    }

    if (this.highlight) {
      push();
      //fill(this.tileColor)
      noFill();
      strokeWeight(2);
      stroke(255);
      rect(x, y, tileSize, tileSize);
      this.highlight = false;
      pop();
    }
  }

  static getColorFromTileType(tileType) {
    if (tileType == 0) return color("#7ec850");
    else if (tileType == 1) return color("#eecda3");
    else if (tileType == 2) return color("#008dc4");
  }

  static getImageFromTileType(tileType) {
    if (tileType == 0) return grassImage;
    else if (tileType == 1) return sandImage;
    else if (tileType == 2) return waterImage;
  }
}
