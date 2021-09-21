let avgFps = 60;
let decay = 0.9;

function drawFramerate() {
  avgFps = decay * avgFps + (1.0 - decay) * getFrameRate();
  let fpsString = "FPS: " + parseInt(avgFps);
  push();
  textSize(24);
  fill(255);
  text(fpsString, textWidth(""), textAscent(""));
  pop();
}
