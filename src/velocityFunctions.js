import { visualRange } from "./settings";

const distance = (boid1, boid2) => {
    return Math.sqrt(
        (boid1.x - boid2.x) * (boid1.x - boid2.x) +
        (boid1.y - boid2.y) * (boid1.y - boid2.y),
    );
}

const flyTowardsCenter = (boid, boids) => {
    const centeringFactor = boid.centeringFactor || 0.005;

    let centerX = 0;
    let centerY = 0;
    let numNeighbors = 0;

    for (let otherBoid of boids) {
        if (otherBoid.type === boid.type && distance(boid, otherBoid) < visualRange) {
            centerX += otherBoid.x;
            centerY += otherBoid.y;
            numNeighbors += 1;
        }
    }

    if (numNeighbors) {
        centerX = centerX / numNeighbors;
        centerY = centerY / numNeighbors;

        boid.dx += (centerX - boid.x) * centeringFactor;
        boid.dy += (centerY - boid.y) * centeringFactor;
    }
}

const keepWithinBounds = (boid, width, height) => {
    const margin = 200;
    const turnFactor = Math.random();
    const turnFactorx = Math.random() * 0.5 - 0.25;
    const turnFactory = Math.random() * 0.5 - 0.25;

    boid.dx += turnFactorx;
    boid.dy += turnFactory;

    if (boid.x < margin) {
        boid.dx += turnFactor;
    }
    if (boid.x > width - margin) {
        boid.dx -= turnFactor
    }
    if (boid.y < margin) {
        boid.dy += turnFactor;
    }
    if (boid.y > height - margin) {
        boid.dy -= turnFactor;
    }
}

const limitSpeed = (boid) => {
    let speedLimit = boid.speedLimit || 2;

    const speed = Math.sqrt(boid.dx * boid.dx + boid.dy * boid.dy);
    if (speed > speedLimit) {
        boid.dx = (boid.dx / speed) * speedLimit;
        boid.dy = (boid.dy / speed) * speedLimit;
    }
}

const matchVelocity = (boid, boids) => {
    const matchingFactor = boid.matchingFactor || 0.05;

    let avgDX = 0;
    let avgDY = 0;
    let numNeighbors = 0;

    for (let otherBoid of boids) {
        if (boid.type === otherBoid.type && distance(boid, otherBoid) < visualRange) {
            avgDX += otherBoid.dx;
            avgDY += otherBoid.dy;
            numNeighbors += 1;
        }
    }

    if (numNeighbors) {
        avgDX = avgDX / numNeighbors;
        avgDY = avgDY / numNeighbors;

        boid.dx += (avgDX - boid.dx) * matchingFactor;
        boid.dy += (avgDY - boid.dy) * matchingFactor;
    }
}


const avoidSelf = (boid, boids) => {
    const minDistance = boid.avoidSelf.distance || 20;
    const avoidFactor = boid.avoidSelf.factor || 0.05;
    let moveX = 0;
    let moveY = 0;
    for (let otherBoid of boids) {
        if (otherBoid.type === boid.type && otherBoid !== boid) {
            if (distance(boid, otherBoid) < minDistance) {
                moveX += boid.x - otherBoid.x;
                moveY += boid.y - otherBoid.y;
            }
        }
    }

    boid.dx += (moveX / 2) * avoidFactor;
    boid.dy += (moveY / 2) * avoidFactor;
}

const avoidOther = (boid, boids) => {
    const minDistance = boid.avoidOther.distance || 20;
    const avoidFactor = boid.avoidOther.factor || 0.05;
    let moveX = 0;
    let moveY = 0;
    for (let otherBoid of boids) {
        if (otherBoid !== boid) {
            if (otherBoid.type !== boid.type && distance(boid, otherBoid) < minDistance) {
                moveX += boid.x - otherBoid.x;
                moveY += boid.y - otherBoid.y;
            }
        }
    }

    boid.dx += (moveX / 2) * avoidFactor;
    boid.dy += (moveY / 2) * avoidFactor;
}

const avoidCursor = (boid, curser) => {
    const minDistance = boid.avoidCursor.distance;
    const avoidFactor = boid.avoidCursor.factor;
    let moveX = 0;
    let moveY = 0;

    if (distance(boid, curser) < minDistance) {
        moveX += boid.x - curser.x;
        moveY += boid.y - curser.y;
    }

    boid.dx += (moveX / 2) * avoidFactor;
    boid.dy += (moveY / 2) * avoidFactor;
}

module.exports = {
    flyTowardsCenter,
    keepWithinBounds,
    limitSpeed,
    matchVelocity,
    avoidSelf,
    avoidOther,
    avoidCursor
}