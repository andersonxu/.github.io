let numbers = [true];
let count = 1;
let sequence = [];
let index = 0;
let arcs = [];

class Arc {
    constructor(start, end, dir) {
        this.start = start;
        this.end = end;
        this.dir = dir;
    }
    show() {
        let diameter = abs(this.end - this.start);
        let x = (this.end + this.start) / 2;
        stroke(255);
        noFill();
        if (this.dir == 0) {
            arc(x, 0, diameter, diameter, 0, PI);
        } else {
            arc(x, 0, diameter, diameter, PI, 0);
        }
    }
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    numbers[index] = true;
    sequence.push(index);
    step();
}
function step() {
    let next = index - count;
    if (next < 0 || numbers[next]) {
        next = index + count;
    }
    numbers[next] = true;
    sequence.push(next);

    let a = new Arc(index, next, count % 2);
    arcs.push(a);
    index = next;
    count++;
}
function draw() {
    step();
    translate(0,height/2);
    scale(width/count);
    background(0);
    
    for(let a of arcs){
        a.show();
    }
}