let numbers = [true];
let count = 1;
let sequence = [];
let index = 0;
let arcs = [];
let sixteen = 16;
class Arc {
    constructor(start, end, count) {
        this.start = start;
        this.end = end;
        this.dir = count % 2;
        let RGB_index = parseInt(count / 16) % 6;
        let increase = count % 16;
        if (RGB_index == 0) {
            this.R = 127 + increase * 16;
            this.G=127;
            this.B=255;
        } else if (RGB_index == 1) {
            this.R = 255;
            this.G=127;
            this.B=255 - increase * 16;
        }else if (RGB_index == 2) {
            this.R = 255;
            this.G=127 + increase * 16;
            this.B=127;
        }
        else if (RGB_index == 3) {
            this.R = 255 - increase * 16;
            this.G=255;
            this.B=127;
        }
        else if (RGB_index == 4) {
            this.R = 127;
            this.G=255;
            this.B=127 + increase * 16;
        }
        else if (RGB_index == 5) {
            this.R = 127;
            this.G = 255 - increase * 16;
            this.B=255;
        }
    }
    show() {
        let diameter = abs(this.end - this.start);
        let x = (this.end + this.start) / 2;

        stroke(this.R,this.G,this.B);
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

    let a = new Arc(index, next, count);
    arcs.push(a);
    index = next;
    count++;
}
function draw() {
    step();
    translate(0, height / 2);
    scale(width / count);
    background(0);

    for (let a of arcs) {
        a.show();
    }
}