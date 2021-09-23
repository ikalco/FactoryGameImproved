class World {
  static placeAngle = 0;

  #map = [];
  #width;
  #height;

  constructor(maxTileWidth, maxTileHeight) {
    //this.#width = tileWidth;
    //this.#height = tileHeight;

    //this.#map = TerrainGenrator.generateMap(this.#width, this.#height);
    this.#width = Math.ceil(maxTileWidth / Chunk.Size);
    this.#height = Math.ceil(maxTileHeight / Chunk.Size);

    this.#map = TerrainGenrator.generateChunkMap(this.#width, this.#height);
  }

  update() {
    let mouseWorldCords = World.realCordsToWorldCords(mouseX + camera.getXOffset(), mouseY + camera.getYOffset());

    let chunkX = floor(mouseWorldCords.x / Chunk.Size);
    let chunkY = floor(mouseWorldCords.y / Chunk.Size);

    let worldX = floor(mouseWorldCords.x - chunkX * Chunk.Size);
    let worldY = floor(mouseWorldCords.y - chunkY * Chunk.Size);

    if (this.#map[chunkX]) {
      if (this.#map[chunkX][chunkY]) {
        this.#map[chunkX][chunkY].highlightTile(worldX, worldY);
        if (mouseIsPressed) {
          let clickedTile = this.#map[chunkX][chunkY].getTile(worldX, worldY);
          if (clickedTile.machine == null) {
            clickedTile.machine = new Conveyor(clickedTile);
          }
        }
      }
    }
  }

  draw() {
    // height and width are number of chunks that fit onto screen
    let chunkTileSize = tileSize * Chunk.Size;
    let xOffset = Math.ceil(camera.getXOffset() / chunkTileSize);
    let yOffset = Math.ceil(camera.getYOffset() / chunkTileSize);

    for (let y = -1; y < this.#height; y++) {
      for (let x = -1; x < this.#width; x++) {
        let newX = x + xOffset;
        let newY = y + yOffset;

        if (this.#map[newX]) {
          if (!this.#map[newX][newY]) {
            this.#map[newX][newY] = TerrainGenrator.generateChunk(newX, newY);
          }
        } else {
          this.#map[newX] = [];
          this.#map[newX][newY] = TerrainGenrator.generateChunk(newX, newY);
        }

        this.#map[newX][newY].draw();
      }
    }
  }

  get width() {
    return this.#width;
  }
  get height() {
    return this.#height;
  }

  static worldCordsToRealCords(x, y) {
    return createVector(x * tileSize, y * tileSize);
  }

  static realCordsToWorldCords(x, y) {
    return createVector(Math.floor(x / tileSize), Math.floor(y / tileSize));
  }

  static realCordsToWorldChunkCords(x, y) {
    return createVector(Math.floor(x / tileSize / Chunk.Size), Math.floor(y / tileSize / Chunk.Size));
  }
}
