// START Classes //
class Raindrop {
  // Is a raindrop
  constructor() {
    this.x = Math.random() * 400;
    this.y = 0;
  }
  update() {
    this.y = this.y + 7;
    this.x++;
    fill(0, 0, 255);
    circle(this.x, this.y, 5);
  }
}
class MotherNature {
  //Manages Raindrops
  constructor() {
    this.drops = [];
  }
  createDrop() {
    var newDrop = new Raindrop();
    this.drops.push(newDrop);
  }
  update() {
    for (var i = 0; i < this.drops.length; i++) {
      this.drops[i].update();
    }
  }
}
class Ground {
  // Is the ground
  constructor() {
    this.dropCount = 0;
    this.blue = 20;
    this.y = 250;
  }
  getWet() {
    for (var i = 0; i < m.drops.length; i++) {
      if (m.drops[i].y >= this.y) {
        m.drops.splice(i, 1);
        this.dropCount++;
        if (this.dropCount % 10 == 0) {
          this.blue = this.blue + 10;
          this.y--;
        }
      }
    }
  }
  update() {
    fill(50, 50, this.blue);
    rect(-1, this.y, 402, 1000);
  }
}
// END Classes //

// Global Variables
var g = new Ground();
var m = new MotherNature();

//START P5 Stuff
function setup() {
  //Run once before the application starts
  createCanvas(400, 300);
}

function draw() {
  // Runs 60 times per second...ish
  background(255);

  if (Math.random() < 0.5) {
    m.createDrop();
  }

  m.update();
  g.update();
  g.getWet();
}
//END P5 Stuff
