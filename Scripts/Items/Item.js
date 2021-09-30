class Item {
  static Items = [];
  static Size = Tile.Size / 4 - 1;

  constructor(x, y, id) {
    this.x = 0;
    this.y = 0;

    this.id = 1;
  }

  move(x, y) {
    this.x += x;
    this.y += y;
  }
}
