// (DOM Elements) Variables:
const audioPlayer = document.querySelector("#audio-player");
const volume = document.querySelector("#volume");
const playPause = document.querySelector("#play-pause");
const trackPosition = document.querySelector("#track-position")
let currentTrack = media[0];

// Audio player initialisation:
loadTrack()


// VOLUME SETTINGS

// Volume range:
volume.oninput = () => { audioPlayer.volume = volume.value; }

// Volume range is initialized to the audio player volume:
volume.value = audioPlayer.volume;

// Volume down button (on click):
document.querySelector("#volume-down").onclick = () => {
  audioPlayer.volume -= audioPlayer.volume > 0 && 0.05;
  volume.value = audioPlayer.volume;
}

// Volume up button (on click):
document.querySelector("#volume-up").onclick = () => {
  audioPlayer.volume += audioPlayer.volume < 1 && 0.05;
  volume.value = audioPlayer.volume;
}


// TRACK SELECTION & POSITION RANGE SETTINGS

// Position range:
trackPosition.oninput = () => { audioPlayer.currentTime = trackPosition.value; }

// Position range is updated every 50 milliseconds :
setInterval( () => {
  trackPosition.value = audioPlayer.currentTime;
  // Load next track if the track is over:
  audioPlayer.currentTime === audioPlayer.duration && nextTrack();
}, 50)

// Position range's range is updated when a track is loaded:
audioPlayer.onloadeddata = () => {
  if (audioPlayer.readyState > 1) {
    trackPosition.max = Math.floor(audioPlayer.duration);
  }
}

// Play & Pause button (on click):
playPause.onclick = () => { audioPlayer.paused ? play() : pause(); }

// Previous track button (on click):
document.querySelector("#previous").onclick = previousTrack;

// Next track button (on click):
document.querySelector("#next").onclick = nextTrack;

// Covers (on click and double click):
document.querySelectorAll(".card").forEach((card, index) => {
  // Select and load track on click:
  card.onclick = () => {
    currentTrack = media[index];
    loadTrack();
  }
  // Select, load and play track on double click:
  card.ondblclick =  () => {
    if (audioPlayer.paused) {
      currentTrack = media[index];
      loadTrack();
      play();
    }
  }
})



// FUNCTIONS

// Play and change button icon
function play() {
  audioPlayer.play();
  playPause.firstChild.className = "fas fa-pause";
}

// Pause and change button icon
function pause() {
  audioPlayer.pause();
  playPause.firstChild.className = "fas fa-play";
}

// Change and load previous track -or already started one (if played for 20% or more)-:
function previousTrack() {
  if (audioPlayer.currentTime > audioPlayer.duration / 5) { loadTrack(); }
  else {
    currentTrack = currentTrack === media[0] ? media[media.length - 1] : media[media.indexOf(currentTrack) - 1];
    loadTrack();
  }
}

// Change and load next track
function nextTrack() {
  currentTrack = currentTrack === media[media.length - 1] ? media[0] : media[media.indexOf(currentTrack) + 1];
  loadTrack();
}

// Load track >> Change sources, and update visuals:
function loadTrack() {
  document.querySelector("#source-MP3").src = `./media/${currentTrack.file}.mp3`
  document.querySelector("#source-OGG").src = `./media/${currentTrack.file}.ogg`
  document.querySelector("#source-WAV").src = `./media/${currentTrack.file}.wav`
  updateVisual();
  let paused = audioPlayer.paused;
  audioPlayer.load();
  !paused && audioPlayer.play();
}

// Update visuals >> Change title, artist, and style the current track cover:
function updateVisual() {
  document.querySelector("#title").textContent = currentTrack.name;
  document.querySelector("#artist").textContent = currentTrack.artist;
  document.querySelectorAll(".card-img-top").forEach(image => {
    if (image.src.includes(currentTrack.photo)) {
      image.style.padding = "5px";
      image.style.borderRadius = "25px 0 25px 0";
      image.style.transform = "translateY(-4px) scale(1.075) rotate(1.5deg)";
    } else {
      image.style.padding = "";
      image.style.borderRadius = "";
      image.style.transform = "";
    }
  })
}