//import Chart from '/';

const Status = Object.freeze({
    SUSCEPTIBLE: 0,
    INFECTED: 1,
    RECOVERED: 2
});

function randomInt(max) {
    return Math.floor(Math.random() * max) + 1;
}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Person {
    constructor({baseProbability, position, spreadRadius, status = Status.SUSCEPTIBLE}) {
        this.baseProbability = baseProbability;
        this.status = status;
        this.x = position.x;
        this.y = position.y;
        this.spreadRadius = spreadRadius;
        this.currentProbability = baseProbability;
        this.size = 5;
    }

    draw(ctx) {
        const color = this.status === Status.SUSCEPTIBLE ?
            'blue' : this.status === Status.INFECTED ? 'red' : 'grey';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = color;
        ctx.fill();
    }
}

export default class Simulation {
    constructor(canvas, config) {
        this.populationSize = config.populationSize;
        this.spreadRadius = config.spreadRadius;
        this.baseProbability = config.baseProbability;
        this.infectedPercent = config.infectedPercent;
        this.population = [];
        this.canvas = document.getElementById(canvas);
        this.context = this.canvas.getContext('2d');
        this.days = 0;
        this.susceptible = 0;
        this.infected = 0;
        this.recovered = 0;
        this.graph = new LineGraph('chart');
    }

    generate() {

        const getStatus = (percent) => {
            const randInt = Math.floor(Math.random() * 100);
            if(randInt <= percent * 100) {
                return Status.INFECTED;
            }
            return Status.SUSCEPTIBLE;
        }

        while(this.population.length < this.populationSize) {
            this.population.push(new Person(
                {
                    baseProbability: this.baseProbability,
                    position: new Point(Math.floor(Math.random() * this.canvas.width), Math.floor(Math.random() * 500)),
                    spreadRadius: this.spreadRadius,
                    status: getStatus(this.infectedPercent)
                }
            ))
        }
        this.population.forEach(person => person.draw(this.context));
        this.susceptible = this.population.filter(person => person.status === Status.SUSCEPTIBLE).length;
        this.infected = this.population.filter(person => person.status === Status.INFECTED).length;
        this.graph.update(
            { 
                susceptible: this.susceptible, 
                infected: this.infected, 
                recovered: this.recovered
            }, 
            this.populationSize, this.days);
        document.getElementById('active').innerText = this.infected;
    }
}

class LineGraph {
    constructor(canvas) {
        this.canvas = document.getElementById(canvas);
        this.chart;
    }

    update(data, x, y) {

    }
}


const sim = new Simulation('simArea', { populationSize: 20, infectedPercent: 0.3 });
sim.generate();
console.log(sim);