song = "";
leftWristX = 0; leftWristY = 0;
rightWristX = 0; rightWristY = 0;
numLeftWristY = 0; numRightWristY = 0;
volume = 0; speed = 0;
scoreLeftWrist = 0; scoreRightWrist = 0;
function preload() {
    song = loadSound("music.mp3");
}
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function draw() {
    image(video, 0, 0, 600, 500);

    if(scoreLeftWrist > 0.2){
        numLeftWristY = Math.floor(Number(leftWristY));
        volume = numLeftWristY/500;
        document.getElementById("volume").innerHTML = "Volume - " + volume;
        song.setVolume(volume);
    }
    if (scoreRightWrist > 0.2) {
        numRightWristY = Math.floor(Number(rightWristY));
        speed = numRightWristY/200;
        song.rate(speed);
    }
}
function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded() {
    console.log("PoseNet Loaded!");
}
function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + leftWristX + ", Left Wrist Y = " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + rightWristX + ", Right Wrist Y = " + rightWristY);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Left Wrist Score = " + scoreLeftWrist + ", Right Wrist Score = " + scoreRightWrist);
    }
}