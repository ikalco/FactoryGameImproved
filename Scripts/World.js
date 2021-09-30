class World {
  static placeAngle = 0;
  static placeDirection = { x: 0, y: -1 };
  static canRotate = true;

  #map = [];
  #width;
  #height;

  constructor(maxTileWidth, maxTileHeight) {
    this.#width = Math.ceil(maxTileWidth / Chunk.Size);
    this.#height = Math.ceil(maxTileHeight / Chunk.Size);

    this.#map = TerrainGenrator.generateChunkMap(this.#width, this.#height);
  }

  update() {
    // height and width are number of chunks that fit onto screen
    let chunkTileSize = Tile.Size * Chunk.Size;
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

        this.#map[newX][newY].update();
      }
    }
  }

  getChunk(chunkX, chunkY) {
    if (this.#map[chunkX]) {
      if (this.#map[chunkX][chunkY]) {
        return this.#map[chunkX][chunkY];
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
    return createVector(x * Tile.Size, y * Tile.Size);
  }

  static realCordsToWorldCords(x, y) {
    return createVector(Math.floor(x / Tile.Size), Math.floor(y / Tile.Size));
  }

  static realCordsToWorldChunkCords(x, y) {
    return createVector(Math.floor(x / Tile.Size / Chunk.Size), Math.floor(y / Tile.Size / Chunk.Size));
  }

  static resetPlaceRotation() {
    World.placeAngle = 0;
    World.placeDirection = { x: 0, y: -1 };
  }

  static rotateLeft() {
    World.placeAngle -= HALF_PI;
    console.log("a");
    if (World.placeAngle == 0) {
      World.placeDirection = { x: 0, y: -1 };
    } else if (World.placeAngle == 90) {
      World.placeDirection = { x: 1, y: 0 };
    } else if (World.placeAngle == 180) {
      World.placeDirection = { x: 0, y: 1 };
    } else if (World.placeAngle == 270) {
      World.placeDirection = { x: -1, y: 0 };
    }
  }

  static rotateRight() {
    World.placeAngle += HALF_PI;
    if (World.placeAngle == 0) {
      World.placeDirection = { x: 0, y: -1 };
    } else if (World.placeAngle == 90) {
      World.placeDirection = { x: 1, y: 0 };
    } else if (World.placeAngle == 180) {
      World.placeDirection = { x: 0, y: 1 };
    } else if (World.placeAngle == 270) {
      World.placeDirection = { x: -1, y: 0 };
    }
  }
}
