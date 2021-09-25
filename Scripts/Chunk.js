class Chunk {
  static Size = 16;

  #tiles = [];
  #x;
  #y;

  constructor(x, y, tiles = undefined) {
    this.#x = x;
    this.#y = y;

    if (!tiles) this.#tiles = Chunk.#generateChunkTiles(x, y);
    else this.#tiles = tiles;
  }

  draw() {
    let xOffset = this.#x * Chunk.Size;
    let yOffset = this.#y * Chunk.Size;

    for (let y = 0; y < Chunk.Size; y++) {
      for (let x = 0; x < Chunk.Size; x++) {
        // prettier-ignore
        if (this.#tiles[x][y])
          this.#tiles[x][y].draw(
            Math.floor((x + xOffset) * tileSize - camera.getXOffset()),
            Math.floor((y + yOffset) * tileSize - camera.getYOffset())
          );
      }
    }

    push();
    noFill();
    stroke(255, 0, 0);
    rect(
      this.#x * Chunk.Size * tileSize - camera.getXOffset(),
      this.#y * Chunk.Size * tileSize - camera.getYOffset(),
      Chunk.Size * tileSize,
      Chunk.Size * tileSize
    );
    pop();
  }

  highlightTile(x, y) {
    if (this.#tiles[x] && this.#tiles[x][y]) this.#tiles[x][y].highlight = true;
  }

  getTile(x, y) {
    return this.#tiles[x][y];
  }

  static #generateChunkTiles(chunkX, chunkY) {
    let tiles = [];
    for (let x = 0; x < Chunk.Size; x++) {
      tiles[x] = [];
      for (let y = 0; y < Chunk.Size; y++) {
        tiles[x][y] = new Tile(x + chunkX * Chunk.Size, y + chunkY * Chunk.Size, 0);
      }
    }
    return tiles;
  }
}
