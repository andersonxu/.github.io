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
    text("Next number: "+index, windowWidth/16, windowHeight/16);
    text("Current index: "+count, windowWidth/16, windowHeight/16+32);
    text("Lagest number: "+biggest, windowWidth/16, windowHeight/16+64);
    text("Smaller uncovered number: "+smallest, windowWidth/16, windowHeight/16+96);
    textSize(20);
    fill(255);
    text("The first sequence (A005132) is a sequence of nonnegative integers separated by steps that can be described as “subtract if possible, otherwise add”:\na (0) = 0 ; for  n > 0, a (n) = a (n  −  1)  −  n  if that number is positive and not already in the sequence, otherwise  a (n) = a (n  −  1) + n , whether or not that number is already in the sequence."+smallest, windowWidth/6, windowHeight*14/16,windowWidth*3/4, windowHeight);
    translate(0, windowHeight / 2);
    scale(windowWidth / biggest);
    for (let a of arcs) {
        a.show();
    }
}