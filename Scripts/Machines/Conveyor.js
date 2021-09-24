class Conveyor extends Machine {
    static MaxStackSize = 100;
    static Type = 0x100000;

    #items = [];

    constructor(chunkX, chunkY, tile) {
        super(chunkX, chunkY, tile, Conveyor.Type);

        this.tileWidth = 1;
        this.tileHeight = 1;

        /*
        this.worldX = x;
        this.worldY = y;
        this.tileType = machineType;

        this.tileWidth = 1;
        this.tileHeight = 1;

        this.highlight = false;

        this.direction = Machine.placeDirection;
        */

        this.#items = [];
    }

    update() {

    }

    moveConveyor() {

    }
}
