// accelerometer variables
var x = 0;
var y = 0;
var z = 0;

var xpos;
var ypos;
var diam;

function setup() {
  var myCanvas = createCanvas(windowWidth, windowHeight);
	myCanvas.parent('p5container');
	
	xpos = width/2;
	ypos = height/2;
	diam = 100;
}

function draw() {
	background(123);
	
	textSize(48);
	fill(255, 255, 0);
	text("x:"+x, 20, 40);
	text("y:"+y, 20, 80);
	text("z:"+z, 20, 120);
	
	xpos += x;
	ypos += y;
//	diam += z;
	if (diam > 200) diam = 200;
	
	fill(0);
	stroke(0);
	ellipse(xpos, ypos, diam, diam);
}

// accelerometer Data
window.addEventListener('devicemotion', function(e) 
{
  // get accelerometer values
  x = parseInt(e.accelerationIncludingGravity.x);
  y = parseInt(e.accelerationIncludingGravity.y);
  z = parseInt(e.accelerationIncludingGravity.z); 
});