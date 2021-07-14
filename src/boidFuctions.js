import { offset, boidTypes } from './settings';

export const makeBoids = (width, height) => {
    let boidsArray = [];
    for (let type in boidTypes) {
        let boidProps = boidTypes[type];
        for (let i = 0; i < boidProps.count; i++) {
            boidsArray.push({
                x: Math.random() * (width - 60) + offset.x,    // creates a random number between 0 to width
                y: Math.random() * (height - 60) + offset.y,   // creates a random number between 0 to height
                dx: Math.random() * 10 - 5,  // creates a random number between -5 to 5
                dy: Math.random() * 10 - 5,  // creates a random number between -5 to 5
                history: [],
                type,
                ...boidProps,
            })
        }
    }
    return boidsArray;
}

export const drawBoid = (context, boid) => {
    const angle = Math.atan2(boid.dy, boid.dx);
    context.translate(boid.x, boid.y);
    context.rotate(angle);
    context.translate(-boid.x, -boid.y);
    context.fillStyle = boid.color;
    context.beginPath();
    context.moveTo(boid.x, boid.y);
    context.lineTo(boid.x - 15, boid.y + 5);
    context.lineTo(boid.x - 15, boid.y - 5);
    context.lineTo(boid.x, boid.y);
    context.fill();
    context.setTransform(1, 0, 0, 1, 0, 0);

    context.strokeStyle = boid.tailColor;
    context.beginPath();
    context.moveTo(boid.history[0][0], boid.history[0][1]);
    for (const point of boid.history) {
        context.lineTo(point[0], point[1]);
    }
    context.stroke();
}