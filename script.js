/** @type {HTMLCanvasElement} */

const collisionCanvas = document.querySelector('#collisionCanvas');
const collisionCtx = collisionCanvas.getContext('2d');
collisionCanvas.width = window.innerWidth;
collisionCanvas.height = window.innerHeight;

let obstacleInterval = 4000;
let timeToNextObstacles = obstacleInterval;
let lastTime = 0;
let obstaclesArray = [];

class Bird {
  constructor() {
    this.width = 100;
    this.height = 50;
    this.x = collisionCanvas.width * 0.5 - this.width * 0.5;
    this.y = collisionCanvas.height * 0.5 - this.height * 0.5;
    this.jump = false;
    this.jumpDuration = 40;
    this.directionY = 4;
  }
  update() {

    if (!this.jump) {
      this.y += this.directionY;
    } else {

      if (this.jumpDuration > 0) {
        this.y -= this.directionY
        this.jumpDuration -= this.directionY / 2;
      } else {
        this.jump = false;
        this.jumpDuration = 40;
      }

    }

  }
  draw() {
    collisionCtx.fillRect(this.x, this.y, this.width, this.height);
  }
}
const bird = new Bird();

class Obstacles {
  constructor() {
    this.width = 300;
    this.height = Math.random() * (0.6 * collisionCanvas.height) + (0.2 * collisionCanvas.height)
    this.height2 = collisionCanvas.height - this.height - 250;
    this.x = -this.width;
    this.y = collisionCanvas.height - this.height;
    this.y2 = 0;
    this.markedForDeletion = false;
  }
  update() {
    this.x += 3;
    if (this.x > collisionCanvas.width + this.width) this.markedForDeletion = true;
  }
  draw() {
    collisionCtx.fillRect(this.x, this.y, this.width, this.height);
    collisionCtx.fillRect(this.x, this.y2, this.width, this.height2);
  }
}

function animate(timeStamp) {
  collisionCtx.clearRect(0, 0, collisionCanvas.width, collisionCanvas.height);

  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  timeToNextObstacles += deltaTime;

  if (timeToNextObstacles > obstacleInterval) {
    obstaclesArray.push(new Obstacles());
    timeToNextObstacles = 0;
  }
  obstaclesArray = obstaclesArray.filter(obstacle => !obstacle.markedForDeletion);
  obstaclesArray.forEach(obstacle => obstacle.update());
  obstaclesArray.forEach(obstacle => obstacle.draw());
  console.log(timeToNextObstacles);

  bird.update();
  bird.draw();

  requestAnimationFrame(animate);
} animate(0);



window.addEventListener('click', () => {
  bird.jump = true;
  bird.jumpDuration += 20;
  bird.verticalSpeed++;
});

function CheckForCollisions() {

}