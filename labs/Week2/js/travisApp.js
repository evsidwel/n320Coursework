class Drop {
  constructor() {
    this.x = 40;
    this.y = 0;
  }

  update() {
    this.y++;
    fill(0, 0, 200);
    circle(this.x, this.y, 5);
  }
}

var d = new Drop();

//Run once before the application starts
function setup() {
  createCanvas(400, 300);
}

//runs 60 times a second, or so
function draw() {
  d.update();
}

class RainManager {
  constructor() {
    this.drops = [];
  }

  createDrop() {
    //stub
    //TODO: complete
  }
}
