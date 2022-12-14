prediction1="";
prediction2="";

Webcam.set({
  height:300,
  width:350,
  image_format:'png',
  png_quality:90
  
});
camera=document.getElementById('camera');
Webcam.attach('#camera');

function take_snapshot(){
  Webcam.snap(function(data_uri){
    document.getElementById('result').innerHTML='<img id="captured_image" src="'+data_uri+'"/>' ; 
}) ;
}
console.log("ml5 version",ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/KmS3O7ReD/model.json',modelloaded);

function modelloaded(){
  console.log('model successfuly loaded');
}

function speak(){
  var synth=window.speechSynthesis;
  speak1="the first prediction is "+ prediction1;
  speak2="the second prediction is "+ prediction2;  
  var utterThis=new SpeechSynthesisUtterance(speak1+speak2);
  synth.speak(utterThis);
}
 function check(){
  img=document.getElementById('captured_image');
  classifier.classify(img,gotResult);
 }
  
 function gotResult(error,results){
if(error){
  console.error(error);
  }
  else{
    console.log(results);
    document.getElementById('result_emotion_name1').innerHTML=results[0].label;
    document.getElementById('result_emotion_name2').innerHTML=results[1].label;
    prediction1=results[0].label;
    prediction2=results[1].label;
    speak();
    if(results[0].label=="Sad"){
      document.getElementById(update_emoji1).innerHTML="&#128532";
    }
    if(results[1].label=="Sad"){
      document.getElementById(update_emoji2).innerHTML="&#128532";
        }
        if(results[0].label=="Happy"){
          document.getElementById(update_emoji1).innerHTML="&#128522";
        }
        if(results[1].label=="Happy"){
          document.getElementById(update_emoji2).innerHTML="&#128522";
                  }
                  if(results[0].label=="Angry"){
                    document.getElementById(update_emoji1).innerHTML="&#128548";
                  }
                  if(results[1].label=="Angry"){
                    document.getElementById(update_emoji2).innerHTML="&#128548";
                  }
  }
 }