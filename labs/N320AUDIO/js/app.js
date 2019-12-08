var soundButtons = document.getElementById("soundButtons");

var sounds = [
    "chimes_long",
    "click_clock_loop",
    "pop_10",
    "puff",
    "rustle_5"
];

var soundElements = [];

// Loop through all the sounds and create audio tags for them
sounds.forEach((soundName, idx)=>{

    // The sound
    var newSound = new Audio( "sounds/" + soundName + ".mp3");

    // Store each sound in an array for later reference
    soundElements.push(newSound);

    // The buttons
    var newButton = document.createElement("button");
    newButton.innerHTML = soundName;

    // Store the sound's index
    newButton.setAttribute("data-sound-id", idx);

    // Add them to the page
    soundButtons.appendChild(newButton);

    // Listen for a click on the button and play
    newButton.addEventListener("click", playSoundInArray);

})

function playSoundInArray(event){
    
    // Get sound index
    var soundIndex = Number( event.target.getAttribute("data-sound-id"));

    // Get sound from array
    var selectedSound = soundElements[soundIndex];
    
    selectedSound.play();
}
// console.log(soundElements);

// // Get the audio tag here
// var myAudio = document.getElementById("myAudio");

// function playAudio(){
//     myAudio.play();
// }
// function stopMainAudio(){
//     myAudio.pause();
//     myAudio.currentTime = 0;
// }