/** @type {HTMLCanvasElement} */

const collisionCanvas = document.querySelector('#collisionCanvas');
const collisionCtx = collisionCanvas.getContext('2d');
collisionCanvas.width = window.innerWidth;
collisionCanvas.height = window.innerHeight;

class Bird {
  constructor() {
    this.width = 100;
    this.height = 50;
    this.x = collisionCanvas.width * 0.5 - this.width * 0.5;
    this.y = collisionCanvas.height * 0.5 - this.height * 0.5;
    this.jump = false;
    this.jumpDuration = 20;
    this.verticalSpeed = 1;
  }
  update() {
    if (!this.jump) {
      this.y++
    } else {
      if (this.jumpDuration > 0) {
        this.y-= this.verticalSpeed
        this.jumpDuration -= this.verticalSpeed;
      } else {
        this.jump = false;
        this.jumpDuration = 20;
        this.verticalSpeed = 1;
      }
    }

  }
  draw() {
    collisionCtx.fillRect(this.x, this.y, this.width, this.height);
  }
}
const bird = new Bird();


function animate() {
  collisionCtx.clearRect(0, 0, collisionCanvas.width, collisionCanvas.height);

  bird.update();
  bird.draw();

  requestAnimationFrame(animate);
} animate();



window.addEventListener('click', () => {
  bird.jump = true;
  bird.jumpDuration += 20;
  bird.verticalSpeed++;
});