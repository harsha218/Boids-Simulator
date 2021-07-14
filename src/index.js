import { offset, tailLength } from './settings';
import { flyTowardsCenter, matchVelocity, avoidSelf, avoidOther, avoidCursor, limitSpeed, keepWithinBounds } from './velocityFunctions';
import { makeBoids, drawBoid } from './boidFuctions';

let width = window.innerWidth - offset.x;
let height = window.innerHeight - offset.y;

const curser = { x: 0, y: 0 };

let boids = [];

window.onload = () => {
    document.addEventListener('mousemove', (event) => {
        curser.x = event.clientX;
        curser.y = event.clientY;
    });

    resize();
    boids = makeBoids(width, height);
    window.requestAnimationFrame(getNextFrame);
}

window.onresize = () => resize();

const resize = () => {
    let root = document.getElementById('root');
    root.width = window.innerWidth - offset.x;
    root.height = window.innerHeight - offset.y;
    width = window.innerWidth - offset.x;
    height = window.innerHeight - offset.y;
}

const getNextFrame = () => {

    for (let boid of boids) {
        flyTowardsCenter(boid, boids);
        matchVelocity(boid, boids);
        avoidSelf(boid, boids);
        avoidOther(boid, boids);
        avoidCursor(boid, curser);
        limitSpeed(boid);
        keepWithinBounds(boid, width, height);

        boid.x += boid.dx;
        boid.y += boid.dy;
        boid.history.push([boid.x, boid.y])
        boid.history = boid.history.slice(Math.min(-1, -tailLength));
    }

    const context = document.getElementById("root").getContext("2d");
    context.clearRect(0, 0, width, height);
    for (let boid of boids) {
        drawBoid(context, boid);
    }

    window.requestAnimationFrame(getNextFrame);
}
