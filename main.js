video="";
status="";
objects=[];
function setup(){
    c1=createCanvas(640,450);
    c1.center();
    video.hide();
}
function preload(){
    video= createVideo("video.mp4");
    
}
function draw(){
    image(video, 0, 0, 640, 450);
    r=random(255);
    g=random(255);
    b=random(255);
    if(status != ""){
        objectDetect.detect(video, gotResult);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="Status: Objects Detected";
            document.getElementById("number").innerHTML="Number Of Objects="+objects.length;
            stroke(r, g, b);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label +" "+percent+ "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
function gotResult(error, results){
    if(error){
        console.log(error);
    }else{
        console.log(results);
        objects=results;
    }
}
function start(){
    objectDetect=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}
function modelLoaded(){
    console.log("Model Loaded!");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}