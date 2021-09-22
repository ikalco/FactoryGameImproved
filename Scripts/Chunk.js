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
        for (let y = 0; y < Chunk.Size; y++) {
            for (let x = 0; x < Chunk.Size; x++) {
                if (this.#tiles[x][y]) this.#tiles[x][y].draw(floor(((x + (this.#x * Chunk.Size)) * tileSize) - camera.getXOffset()), floor(((y + (this.#y * Chunk.Size)) * tileSize) - camera.getYOffset()));
            }
        }
    }

    static #generateChunkTiles(chunkX, chunkY) {
        let tiles = [];
        for (let x = 0; x < Chunk.Size; x++) {
            tiles[x] = [];
            for (let y = 0; y < Chunk.Size; y++) {
                tiles[x][y] = new Tile(x + (chunkX * Chunk.Size), y + (chunkY * Chunk.Size), 0);
            }
        }
        return tiles;
    }
}