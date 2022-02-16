p2="";
p1="";
Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera=document.getElementById("camera");
Webcam.attach('#camera');

function capture() {
    Webcam.snap(function(data_uri){
      document.getElementById("result").innerHTML='<img src="'+data_uri+'" id="res">';
    });
}

console.log('ml5 version: ', ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/eoq_nFLcS/model.json', modelloaded);
function modelloaded() {
    console.log('model is loaded')
}

function speak() {
    var synth=window.SpeechSynthesis;
    data1="the first prediction is "+p1;
    data2="the second prediction is "+p2;
    var utter=new SpeechSynthesisUtterance(data1+data2);
    synth.speak(utter);
}

function predict() {
    img=document.getElementById("res");
    classifier.classify(img, gotresult);
}

function gotresult(error, results) {
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("emo1").innerHTML=results[0].label;
        document.getElementById("emo2").innerHTML=results[1].label;
        p1=results[0].label;
        p2=results[1].label;
        speak();

        if(results[0].label=="happy") {
            document.getElementById("emoj1").innerHTML="&#128522;";
        }
        if(results[0].label=="sad") {
            document.getElementById("emoj1").innerHTML="&#128532;";
        }
        if(results[0].label=="angry") {
            document.getElementById("emoj1").innerHTML="&#128548;";
        }

        if(results[1].label=="happy") {
            document.getElementById("emoj2").innerHTML="&#128522;";
        }
        if(results[1].label=="sad") {
            document.getElementById("emoj2").innerHTML="&#128532;";
        }
        if(results[1].label=="angry") {
            document.getElementById("emoj2").innerHTML="&#128548;";
        }
    }
}