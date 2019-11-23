var stack = [];
var oldColor;
var fillColor;

function setup() {
  createCanvas(500, 500);
  noSmooth();
  fillColor = color(155, 255, 90);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function matches(c, x, y) {
  var i = 4 * (y * width + x);
  return (
    pixels[i + 0] === c[0] &&
    pixels[i + 1] === c[1] &&
    pixels[i + 2] === c[2] &&
    pixels[i + 3] === c[3]
  );
}

function draw() {
  if (!stack.length) return;

  var p = stack.pop();
  var x1 = p.x,
    y = p.y;
  while (x1 > 0 && matches(oldColor, x1 - 1, y)) x1--;

  var spanAbove = false;
  var spanBelow = false;

  var x2 = x1 + 1;
  var ip = 4 * (y * width + x2);
  while (x2 < width && matches(oldColor, x2, y)) {
    for (var i = 0; i < 4; i++) pixels[ip++] = fillColor.levels[i];

    if (y > 0 && spanAbove !== matches(oldColor, x2, y - 1)) {
      if (!spanAbove)
        stack.push({
          x: x2,
          y: y - 1
        });
      spanAbove = !spanAbove;
    }
    if (y < height - 1 && spanBelow !== matches(oldColor, x2, y + 1)) {
      if (!spanBelow)
        stack.push({
          x: x2,
          y: y + 1
        });
      spanBelow = !spanBelow;
    }
    x2++;
  }

  updatePixels();
}

function mouseDragged() {
  if (keyIsDown(SHIFT)) return;
  stroke(0);
  strokeWeight(2);
  line(pmouseX, pmouseY, mouseX, mouseY);
}

function mouseClicked() {
  if (keyIsDown(SHIFT)) {
    oldColor = get(mouseX, mouseY);
    loadPixels();
    stack = [];
    stack.push({
      x: mouseX,
      y: mouseY
    });
  }
}
