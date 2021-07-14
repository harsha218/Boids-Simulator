const offset = { x: 30, y: 30 };

const tailLength = 10;

const visualRange = 75;

const boidTypes = {
    red: {
        color: '#d33021',
        tailColor: '#d3302166',
        speedLimit: 5,
        count: 20,
        centeringFactor: 0.005,
        matchingFactor: 0.05,
        avoidSelf: {
            distance: 20,
            factor: 0.05,
        },
        avoidOther: {
            distance: 10,
            factor: 0.005,
        },
        avoidCursor: {
            distance: 100,
            factor: -0.06,
        },
    },
    blue: {
        color: '#558cf4',
        tailColor: '#558cf466',
        speedLimit: 10,
        count: 10,
        centeringFactor: 0.005,
        matchingFactor: 0.05,
        avoidSelf: {
            distance: 20,
            factor: 0.05,
        },
        avoidOther: {
            distance: 70,
            factor: 1,
        },
        avoidCursor: {
            distance: 100,
            factor: 0.06,
        },
    },
    yellow: {
        color: '#d38921',
        tailColor: '#d3892166',
        speedLimit: 5,
        count: 15,
        centeringFactor: 0.02,
        matchingFactor: 0.05,
        avoidSelf: {
            distance: 30,
            factor: 0.05,
        },
        avoidOther: {
            distance: 70,
            factor: 0.05,
        },
        avoidCursor: {
            distance: 0,
            factor: 0,
        },
    }
}

module.exports = {
    offset,
    tailLength,
    boidTypes,
    visualRange
}