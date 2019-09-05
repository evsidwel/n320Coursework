class Raindrop {
  constructor() {
    this.x = 40;
    this.y = 0;
  }

  fall() {
    this.y++;
    fill(0, 0, 200);
    circle(this.x, this.y, 5);
  }
}

class Ground {
  constructor() {
    this.level = 0;
    this.color = rgb(0, 0, 0);
  }
  getWet() {
    let blue = 0;
    blue++;
    this.color = rgb(0, 0, blue);
  }
}

class MotherNature {
  //Manages Ground and Rain
  constructor() {
    this.drops = [];
  }

  createDrop() {
    // "stub"
    // TODO: complete
  }
}

var d = new Drop();
//START P5 Stuff
function setup() {
  //Run once before the application starts
}

function draw() {
  // Runs 60 times per second...ish
  d.fall();
}

//END P5 Stuff
