class Debug {
  static #avgFps = 60;
  static #decay = 0.9;

  static drawFramerate() {
    Debug.#avgFps = Debug.#decay * Debug.#avgFps + (1.0 - Debug.#decay) * getFrameRate();
    let fpsString = "FPS: " + Math.floor(Debug.#avgFps);
    push();
    textSize(24);
    fill(255);
    text(fpsString, textWidth(""), textAscent(""));
    pop();
  }
}
