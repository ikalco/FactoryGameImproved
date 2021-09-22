class Tile {
    constructor(x, y, tileType) {
        this.x = x;
        this.y = y;
        this.tileType = tileType;
        //this.tileColor = Tile.getColorFromTileType(this.tileType);
        this.tileImage = Tile.getImageFromTileType(this.tileType);
    }

    draw(x, y) {
        image(this.tileImage, x, y, tileSize, tileSize);
        if (this.highlight) {
            push();
            //fill(this.tileColor)
            noFill();
            strokeWeight(2);
            stroke(255, 255, 255);
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