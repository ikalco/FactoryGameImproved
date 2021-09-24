class InventorySlot {
    constructor() {
        this.specified = false;
    }

    addItems(numOfItems) {
        if (!this.specified) return;

        console.log(this.numOfItems + numOfItems, this.itemType.MaxStackSize);

        if (this.numOfItems + numOfItems >= this.itemType.MaxStackSize) {
            let extraNumOfItems = Math.abs(this.itemType.MaxStackSize - (this.numOfItems + numOfItems));

            this.numOfItems += numOfItems - extraNumOfItems;

            return extraNumOfItems;
        }

        this.numOfItems += numOfItems;
        return 0;
    }

    subtractItems(numOfItems) {
        if (!this.specified) return;

        if (this.numOfItems - numOfItems <= 0) return false;
        this.numOfItems -= numOfItems;
        return true;
    }

    setItemType(numOfItems, itemType) {
        if (this.specified) return;

        this.numOfItems = 0;
        this.itemType = itemType;

        this.specified = true;
        if (this.addItems(numOfItems) > 0) throw console.error('ItemStackError: You can only create an item stack with a lower numOfItems given than maxStackSize');
    }

    getItemType() {
        if (this.specified) {
            return this.itemType;
        }
    }
}

class Inventory {
    constructor(player) {
        this.inventory = new Array(40);

        for (let i = 0; i < this.inventory.length; i++) {
            this.inventory[i] = new InventorySlot();
        }

        this.inventory[0].setItemType(Conveyor.MaxStackSize, Conveyor);
        this.player = player;

        this.selectedItem = 0;
    }

    update() {
        let mouseWorldCords = World.realCordsToWorldCords(mouseX + camera.getXOffset(), mouseY + camera.getYOffset());

        let chunkX = floor(mouseWorldCords.x / Chunk.Size);
        let chunkY = floor(mouseWorldCords.y / Chunk.Size);

        let worldX = floor(mouseWorldCords.x - chunkX * Chunk.Size);
        let worldY = floor(mouseWorldCords.y - chunkY * Chunk.Size);

        let chunk = world.getChunk(chunkX, chunkY);

        chunk.highlightTile(worldX, worldY);
        if (Player.keysPressed[81]) this.selectedItem = null;
        if (mouseIsPressed) {
            let clickedTile = chunk.getTile(worldX, worldY);
            if (mouseButton == LEFT) {
                if (this.selectedItem != null) {
                    let selectedItemClass = this.inventory[this.selectedItem].getItemType();
                    if (clickedTile.machine == null || clickedTile.machine instanceof selectedItemClass) {
                        clickedTile.machine = new selectedItemClass(chunkX, chunkY, clickedTile);
                    }
                }
            }
            if (mouseButton == RIGHT) {
                if (clickedTile.machine != null) {
                    clickedTile.machine.delete();
                    clickedTile.machine = null;
                }
            }
        }
    }

    draw() {
        if (this.selectedItem != null) {
            push();
            tint(0, 150, 0);
            rotatedImage(Tile.Tiles[this.inventory[this.selectedItem].getItemType().Type], mouseX - tileSize / 2, mouseY - tileSize / 2, tileSize, tileSize, World.placeAngle);
            pop();
        }
    }
}