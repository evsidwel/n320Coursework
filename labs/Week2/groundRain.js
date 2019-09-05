class MotherNature {
  //Manages Ground and Rain
  constructor() {}
}

class Raindrop {
  constructor() {
    this.level = 100;
  }
  fall() {
    while (this.level >= 0) {
      this.level--;
    }
    if (this.level <= 0) {
    }
  }
}

class Ground {
  constructor() {
    this.level = 0;
    this.color = rgb(0, 0, 0);
  }
  getWet() {
    let blue = 0;
  }
}
