class Ball {
  //Creates a class "Ball". The ball uses the module pattern. Allows multiple instances of this ball class.

  constructor(yPos) {
    // The Constructor.
    // Defines the position attribute.
    this.position = { x: 100, y: yPos };
    // Defines the velocity attribute.
    this.velocity = { x: 10, y: 0 };
  }

  update() {
    // Defines what Ball does during the P5 draw method.

    // Changes the x position by adding the x velocity.
    this.position.x += this.velocity.x;
    // Changes the y postion by adding the y velocity.
    this.position.y += this.velocity.y;

    // Draws a circle at the x and y position of size 20.
    circle(this.position.x, this.position.y, 20);

    // If the ball is beyon the x upper and lower bounds: call the ballBeyond method and passes the current instance of ball to it.
    if (this.position.x < 0 || this.position.x > 400) {
      World.ballBeyond(this);
    }
  }
}

var World = {
  // Defines the canvas for the p5 application. This uses a mediator pattern where other objects interact.

  // Sets the background color in rbg.
  bgcolor: [237, 119, 83],

  // array to hold boxes
  boxes: [],

  // Defines the ballBeyond method which accepts a ball input.
  ballBeyond: function(whichBall) {
    // Changes the background color when this funtion is called.
    this.bgcolor = [Math.random() * 255, Math.random() * 255, 83];
    // Resets the passed ball's x position
    whichBall.position.x = 100;
    // Resets the passed ball's x velocity
    whichBall.velocity.x = (Math.random() - 0.5) * 20;
    // Increases the size of the Boxes
    for (i = 0; i < this.boxes.length; i++) {
      if (this.boxes[i].size >= 100) {
        this.boxes[i].size = 20;
      } else {
        this.boxes[i].size = this.boxes[i].size + 5;
      }
    }
  }
};

//class for a box
//Grows in size every time a ball hits an edge and is reset
class Box {
  constructor(xPos) {
    this.position = { x: xPos, y: 150 };
    this.size = 20;
  }
  update() {
    // Draw the rectangle
    rect(this.position.x, this.position.y, this.size, this.size);
  }
}

// "For fun": multiple balls

var ballOne = new Ball(100); // Create a new instance of the Ball class called ball at yPosition 100
var ballTwo = new Ball(200); // Create a new instance of the Ball class called ballTwo at yPosition 200
World.boxes.push(new Box(100));
World.boxes.push(new Box(300));

function setup() {
  // P5 application essential
  createCanvas(400, 300);
}

function draw() {
  // P5 application essential
  background(World.bgcolor);
  ballOne.update();
  ballTwo.update();
}
