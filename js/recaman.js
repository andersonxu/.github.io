let numbers = [true];
let count = 1;
let sequence = [];
let index = 0;
let arcs = [];
let biggest=0;
let smallest=1;
class Arc {
    constructor(start, end, count) {
        this.start = start;
        this.end = end;
        this.dir = count % 2;
        colorMode(HSB,255);
        this.c =color(count % 256,100,255);
    }
    show() {
        let diameter = abs(this.end - this.start);
        let x = (this.end + this.start) / 2;

        stroke(this.c);
        strokeWeight(1);
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
    if(index>biggest){
        biggest=index;
    }
    if(next==smallest){
        smallest++;
        while(numbers[smallest]){
            smallest++;
        }
    }
    count++;
}
function draw() {
    step();
    background(0);
    textSize(32);
    fill(color(count % 256,100,255));
    text("Next number: "+index, width/16, height/16);
    text("Current index: "+count, width/16, height/16+32);
    text("Lagest number: "+biggest, width/16, height/16+64);
    text("Smaller uncovered number: "+smallest, width/16, height/16+96);
    translate(0, height / 2);
    scale(width / biggest);
    for (let a of arcs) {
        a.show();
    }
}