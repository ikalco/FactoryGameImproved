class InfiniteResourceConveyor extends Conveyor {
  constructor(chunkX, chunkY, tile, resource) {
    super(chunkX, chunkY, tile);
  }

  update() {
    super.update();
    this.items = [
      /* FULL AT ALL TIMES WITH RESOURCE */
    ];
  }
}
