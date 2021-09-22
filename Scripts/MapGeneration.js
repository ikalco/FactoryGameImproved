class TerrainGeneration {
  static #noiseScale = 0.05

  static setup() {
    noiseDetail(5, 0.5);
  }

  static generateMap(mapWidth, mapHeight) {
    let map = [];
    for (let i = 0; i < mapWidth; i++) {
      map[i] = [];
      for (let j = 0; j < mapHeight; j++) {
        map[i][j] = TerrainGeneration.#generateTile(i, j);
      }
    }
    return map;
  }

  static #generateTile(x, y) {
    const v = noise((x - 10000) * TerrainGeneration.#noiseScale, (y - 10000) * TerrainGeneration.#noiseScale);

    // 0 = grass
    // 1 = sand
    // 2 = water

    if (v > 0.9) {
      return new Tile(x, y, 2);
    } else if (v > 0.5) {
      return new Tile(x, y, 1);
    } else if (v > 0) {
      return new Tile(x, y, 0);
    }
  }
}