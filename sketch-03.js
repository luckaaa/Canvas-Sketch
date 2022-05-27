const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 2048, 2048 ],
  animate: true
};

const colors = ["#30cfd0", "#330867", "#a8edea", "#fed6e3", "#5ee7df", "#b490ca"]

const sketch = ({ context, width, height }) => {

  const agents = [];

  for (let i = 0; i < 80; i++){
    const x = random.range(0, width);
    const y = random.range(0, height);

    agents.push(new Agent(x,y))
  }

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];

      for (let j = 0 + i; j < agents.length; j++) {
        const other = agents[j];

        const dist = agent.pos.getDistance(other.pos);

        if (dist > 200) continue;

        context.beginPath();
        context.moveTo(agent.pos.x, agent.pos.y);
        context.lineTo(other.pos.x, other.pos.y);
        context.stroke()
      }
    }

    agents.forEach(agent => {
      agent.update()
      agent.draw(context);
      agent.wrap(width, height);
    });
  }
};

canvasSketch(sketch, settings);

class Vector {
  constructor(x, y, radius){
    this.x = x;
    this.y = y;
  }

  getDistance(v){
    const dx = this.x - v.x
    const dy = this.y - v.y
    return Math.sqrt(dx * dx + dy * dy)
  }
}

class Agent {
  constructor(x, y){
    this.pos = new Vector(x, y);
    this.vel = new Vector(random.range(-1, 1), random.range(-1, 1));
    this.radius = random.range(4,12);
  }

  bounce(width, height){
    if (this.pos.x <= 0 || this.pos.x >= width) this.vel.x *= -1.2;
    if (this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1.2;
  }
     
  wrap(width, height){
    if (this.pos.x > width) this.pos.x = 0;
  }

  update(){
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  draw(context){
    //var color = colors[Math.floor(Math.random()*5)]

    context.save()
    context.translate(this.pos.x, this.pos.y)

    context.lineWidth = 4

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fillStyle = "black"
    context.fill();

    context.restore();
  }
}

