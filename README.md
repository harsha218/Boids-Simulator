# Boids-Simulator
A simple JS program that simulates the Concept of boids https://en.wikipedia.org/wiki/Boids


## Demo
Feel free to checkout the demo here https://harsha218.github.io/Boids-Simulator/

## Explanation
This simulation resembles Artificial Life like Flocking Birds or Group of Fish. These Boids always try to pull themselves together and try matching their speeds to travel in Groups. Simultaneously, they push them from other to maitain a minimum distance from other boids.

In the demo, I have divided the Boids into 3 types (red, blue, gold). They have different characteristics which I explained below.

**Red:**
These travels slow compared to others. And they like the curser. They are at Top of the Food change on the screen and they are not afraid of any other type of Boids.

**Blue:**
These are the fastest of three types. Also they are afraid of every other type of Boids and the curser.

**Gold:**
Gold's characteristics lies between Red's and Blue's. These travel at moderate speed, afraid of Reds but not Blues. This type don't really care about the curser. They mind their own business until some Reds come near them.

Feel free to folk my repository and play with the numbers in settings.js file.

## Motivation
This project is inspired from Ben Eater's implementation of Boids. Check out his implementation here https://eater.net/boids