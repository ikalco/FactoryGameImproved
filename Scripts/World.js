class World {
    #map = [];
    #width;
    #height;

    constructor(maxTileWidth, maxTileHeight) {
        //this.#width = tileWidth;
        //this.#height = tileHeight;

        //this.#map = TerrainGenrator.generateMap(this.#width, this.#height);
        this.#width = ceil(maxTileWidth / Chunk.Size);
        this.#height = ceil(maxTileHeight / Chunk.Size);

        this.#map = TerrainGenrator.generateChunkMap(this.#width, this.#height);
    }

    update() {
        let mouseWorldCords = World.realCordsToWorldCords(mouseX + camera.getXOffset(), mouseY + camera.getYOffset());
        if (this.#map[mouseWorldCords.x])
            if (this.#map[mouseWorldCords.x][mouseWorldCords.y])
                this.#map[mouseWorldCords.x][mouseWorldCords.y].highlight = true;

        //console.log(mouseWorldCords.x, mouseWorldCords.y);
    }

    draw() {
        for (let y = 0; y < this.#height; y++) {
            for (let x = 0; x < this.#width; x++) {
                if (this.#map[x][y]) this.#map[x][y].draw(floor((x * tileSize) - camera.getXOffset()), floor((y * tileSize) - camera.getYOffset()));
            }
        }
    }

    chunkUpdate() { }

    chunkDraw() {
        // height and width are number of chunks that fit onto screen

        for (let y = -1; y < this.#height; y++) {
            for (let x = -1; x < this.#width; x++) {
                let newX = x + ceil((camera.getXOffset() / tileSize / Chunk.Size));
                let newY = y + ceil((camera.getYOffset() / tileSize / Chunk.Size));

                if (this.#map[newX]) {
                    if (this.#map[newX][newY]) {
                        this.#map[newX][newY].draw();
                    } else {
                        this.#map[newX][newY] = TerrainGenrator.generateChunk(newX, newY);
                        this.#map[newX][newY].draw();
                    }
                } else {
                    this.#map[newX] = [];
                    this.#map[newX][newY] = TerrainGenrator.generateChunk(newX, newY);
                    this.#map[newX][newY].draw();
                }
            }
        }
    }

    get width() { return this.#width }
    get height() { return this.#height }

    static worldCordsToRealCords(x, y) {
        return createVector(x * tileSize, y * tileSize);
    }

    static realCordsToWorldCords(x, y) {
        return createVector(floor(x / tileSize), floor(y / tileSize));
    }
}