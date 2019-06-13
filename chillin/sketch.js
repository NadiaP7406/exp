var canvas,tube,font,letters=[],$jscomp$destructuring$var0=Matter,Engine=$jscomp$destructuring$var0.Engine,World=$jscomp$destructuring$var0.World,Bodies=$jscomp$destructuring$var0.Bodies,Mouse=$jscomp$destructuring$var0.Mouse,MouseConstraint=$jscomp$destructuring$var0.MouseConstraint,Constraint=$jscomp$destructuring$var0.Constraint,w,h,tilePoints=[],numTileRows=16,numTileCols=16,xTileInc,yTileInc,boundaries=[],world,engine,mConstraint,poolSfc,poolEfc,poolSc,shadowBoxCol,shadowTextCol,shapeBoxCol,
shapeTextCol,shapeBlankCol,input,button,saveButton;function preload(){font=loadFont("SpaceMono-Regular.ttf")}
function setup(){w=windowWidth;h=windowHeight-40;setAttributes("premultipliedAlpha",!0);canvas=createCanvas(w,h,WEBGL);canvas.position(0,40);gl=this._renderer.GL;gl.disable(gl.DEPTH_TEST);colorMode(HSB,360,100,100,100);perspective(PI/2.9,width/height,.01,1E4);engine=Engine.create();world=engine.world;boundaries[0]=new Ground(w/2,h+20,w,40);boundaries[1]=new Ground(w/2,-20,w,40);boundaries[2]=new Ground(-20,h/2,40,h);boundaries[3]=new Ground(w+20,h/2,40,h);textFont(font);textAlign(CENTER,CENTER);setupColors();
xTileInc=w/numTileCols;yTileInc=h/numTileRows;setupSurface();setupShapes("c h i l l i n *");var a=Mouse.create(canvas.elt);a.pixelRatio=displayDensity();mConstraint=MouseConstraint.create(engine,{mouse:a,constrain:{stiffness:.2}});World.add(world,mConstraint);input=createInput("");input.id("input");input.position(0,0);input.attribute("placeholder","type message...");button=createButton("\u21b5");button.id("button");isMobileDevice()&&button.style("width","20%");button.position(input.width,input.y);
button.mousePressed(updateShapes);saveButton=createButton("\u2193");saveButton.id("saveButton");saveButton.position(input.width+button.width,input.y);saveButton.mousePressed(saveImage);isMobileDevice()&&saveButton.hide()}function saveImage(){var a=canvas.elt.toDataURL("image/png"),c=document.createElement("a");c.download="image.png";c.href=a;c.click()}
function draw(){clear();Engine.update(engine);if(0==rotationX&&0==rotationY){var a=constrain(map(mouseY,0,height,.01*PI,.01*-PI),-PI/10,PI/10);var c=constrain(map(mouseX,0,width,.01*-PI,.01*PI),-PI/10,PI/10)}else a=constrain(map(rotationX,PI/2,-PI/2,.005*-PI,.005*PI),-PI/15,PI/15),c=constrain(map(rotationY,-PI/2,PI/2,.005*-PI,.005*PI),-PI/15,PI/15);rotateX(a);rotateY(c);world.gravity.x=1E-5*cos(frameCount/50+random(-.01,.01))*w+.001*rotationY;world.gravity.y=1E-5*sin(frameCount/50)*h+.001*rotationX;
translate(-w/2,-h/2,300);drawPool(1E3,poolSfc,poolEfc,poolSc);push();translate(0,0,-1E3);for(a=0;a<letters.length;a++)c=letters[a],c.setBoxColor(shadowBoxCol),c.setTextColor(shadowTextCol),c.activateShadow(),c.show();pop();updateSurface();push();translate(0,0,-320);translate(0,0,20*sin(frameCount/80));drawSurface();pop();push();translate(0,0,-320);for(a=0;a<letters.length;a++)push(),translate(0,0,20*sin(.4*a+frameCount/80)),c=letters[a],c.deactivateShadow(),c.setBoxColor(shapeBoxCol),c.setTextColor(shapeTextCol),
c.setBlankColor(shapeBlankCol),c.show(),pop();pop();text("why",-800,-800)}function setupColors(){poolSfc=color(174,85,69);poolEfc=color(225,100,64);poolSc=color(157,35,90);shadowBoxCol=color(220,99,25,40);shadowTextCol=color(0,0,0,0);shapeBoxCol=color(6,94,98);shapeTextCol=color(0,0,100);shapeBlankCol=color(60,80,100)}
function randColors(){var a=random(360),c=(a+random(150,210))%360,d=(c+random(30,90))%360;poolSfc=color(a,random(0,80),random(60,90));poolEfc=color(a,random(0,80),random(60,90));poolSc=color(random(360),random(80,100),random(60,90));shadowBoxCol=color(a,random(0,80),random(40,70),50);shapeBoxCol=color(c,random(80,100),random(60,90));shapeTextCol=color(0,0,.5>random(1)?0:100);shapeBlankCol=color(d,random(80,100),random(70,90))}
function drawSurface(){noStroke();for(var a,c,d,e,g=0;g<numTileRows;g++)for(var f=0;f<numTileCols;f++)e=f+g*numTileCols+g,a=tilePoints[e],c=tilePoints[e+1],d=tilePoints[e+1+numTileCols],e=tilePoints[e+2+numTileCols],beginShape(),fill(170,15,100,30-3*sq(a.z)),vertex(a.x,a.y,a.z),fill(170,15,100,30-3*sq(c.z)),vertex(c.x,c.y,c.z),fill(170,15,100,30-3*sq(e.z)),vertex(e.x,e.y,e.z),fill(170,15,100,30-3*sq(d.z)),vertex(d.x,d.y,d.z),endShape()}
function updateSurface(){for(var a=0,c=0;c<=h;c+=yTileInc)for(var d=0;d<=w;d+=xTileInc)tilePoints[a].z=30*noise(.002*d+.002*frameCount,.002*c+.002*frameCount)-15,a++}function setupSurface(){for(var a=0;a<numTileRows+1;a++)for(var c=0;c<numTileCols+1;c++)tilePoints.push(createVector(c*xTileInc,a*yTileInc,0))}
function setupShapes(a){for(var c=0;c<letters.length;c++)letters[c].removeBody();letters=[];c=4>=a.length?.28:6>=a.length?.25:.16;if(h>w)for(var d=w/4,e=h/10,g=0;g<a.length;g++)letters[g]=new Letter(a[g].toUpperCase(),d,e,max(w,h)*c),d+=w/4,d>=w&&(d=w/4,e+=h/5);else for(d=w/10,e=h/4,g=0;g<a.length;g++)letters[g]=new Letter(a[g].toUpperCase(),d,e,max(w,h)*c),d+=w/5,d>=w&&(d=w/5,e+=h/4)}function updateShapes(){var a=input.value().substring(0,15);setupShapes(a);input.value("")}
function drawPool(a,c,d,e){strokeWeight(3);stroke(e);fill(c);var g=w/6;e=h/6;var f=a/6;push();rotateY(PI/2);for(var b=0;b<a-f;b+=f)fill(lerpColor(c,d,b/a)),rect(b,0,f,h);for(b=0;b<a;b+=f)line(b,0,b,h);for(b=0;b<h;b+=e)line(0,b,a,b);pop();push();rotateX(-PI/2);for(b=0;b<a-f;b+=f)fill(lerpColor(c,d,b/a)),rect(0,b,w,f);for(b=0;b<w;b+=g)line(b,0,b,a);for(b=0;b<a;b+=f)line(0,b,w,b);pop();push();translate(w,0);rotateY(PI/2);for(b=0;b<a-f;b+=f)fill(lerpColor(c,d,b/a)),rect(b,0,f,h);for(b=0;b<a;b+=f)line(b,
0,b,h);for(b=0;b<h;b+=e)line(0,b,a,b);pop();push();translate(0,h);rotateX(-PI/2);for(b=0;b<a-f;b+=f)fill(lerpColor(c,d,b/a)),rect(0,b,w,f);for(b=0;b<w;b+=g)line(b,0,b,a);for(b=0;b<a;b+=f)line(0,b,w,b);pop();push();translate(0,0,-a);fill(lerpColor(c,d,1));rect(0,0,w,h);for(a=0;a<w;a+=g)line(a,0,a,h);for(a=0;a<h;a+=e)line(0,a,w,a);pop()}function deviceShaken(){}function keyPressed(){keyCode!==RETURN&&keyCode!==ENTER||updateShapes();"\\"===key&&randColors()}
function isMobileDevice(){return"undefined"!==typeof window.orientation||-1!==navigator.userAgent.indexOf("IEMobile")};