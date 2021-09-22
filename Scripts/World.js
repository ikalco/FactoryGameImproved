class World {
    #map = [];
    #width;
    #height;

    constructor(filePath) {
        this.loadWorld(filePath);
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
                else {
                    push();
                    noStroke();
                    fill(0);
                    rect(floor((x * tileSize) - camera.getXOffset()), floor((y * tileSize) - camera.getYOffset()), tileSize, tileSize);
                    pop();
                }
            }
        }
    }

    loadWorld(filePath) {
        this.#width = tileWidth;
        this.#height = tileHeight;/*
        for (let i = 0; i < this.#width; i++) {
            this.#map[i] = [];
            for (let j = 0; j < this.#height; j++) {
                this.#map[i][j] = new Tile(i, j, 0); //getColor(i, j);
            }
        }*/
        this.#map = TerrainGeneration.generateMap(this.#width, this.#height);
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