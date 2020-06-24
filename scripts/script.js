const audioPlayer = document.querySelector("#audio-player");
const volume = document.querySelector("#volume");
const playPause = document.querySelector("#play-pause");
const trackPosition = document.querySelector("#track-position");
let currentTrack = media[0];

volume.value = audioPlayer.volume;
loadTrack();

setInterval(() => {
  trackPosition.value = audioPlayer.currentTime;
  if (audioPlayer.currentTime === audioPlayer.duration) { nextTrack(); }
}, 50)

audioPlayer.onloadeddata = () => {
  if (audioPlayer.readyState > 1) { trackPosition.max = Math.floor(audioPlayer.duration); }
}

trackPosition.addEventListener("input", () => {
  audioPlayer.currentTime = trackPosition.value;
})

document.querySelectorAll(".card").forEach((card, index) => {
  card.addEventListener("click", () => {
    currentTrack = media[index];
    loadTrack();
  });
  card.addEventListener("dblclick", () => {
    if (audioPlayer.paused) {
      currentTrack = media[index];
      loadTrack();
      play();
    }
  });
})

document.querySelector("#previous").onclick = previousTrack;
document.querySelector("#next").onclick = nextTrack;

// Volume
volume.oninput = () => { audioPlayer.volume = volume.value; }

document.querySelector("#volume-down").addEventListener("click", () => {
    audioPlayer.volume -= audioPlayer.volume > 0 && 0.05;
    volume.value = audioPlayer.volume;
})

document.querySelector("#volume-up").addEventListener("click", () => {
    audioPlayer.volume += audioPlayer.volume < 1 && 0.05;
    volume.value = audioPlayer.volume;
})

// Play/Pause
playPause.addEventListener("click", () => {
  audioPlayer.paused ? play() : pause();
})

function play() {
  playPause.firstChild.className = "fas fa-pause";
  audioPlayer.play();
}

function pause() {
  playPause.firstChild.className = "fas fa-play";
  audioPlayer.pause();
}

function previousTrack() {
  if (audioPlayer.currentTime > audioPlayer.duration / 5) { loadTrack(); }
  else { currentTrack = currentTrack === media[0] ? media[media.length - 1] : media[media.indexOf(currentTrack) - 1]; }
  loadTrack()
}

function nextTrack() {
  currentTrack = currentTrack === media[media.length - 1] ? media[0] : media[media.indexOf(currentTrack) + 1];
  loadTrack()
}

function loadTrack() {
  document.querySelector("#source-MP3").src = `./media/${currentTrack.file}.mp3`
  document.querySelector("#source-OGG").src = `./media/${currentTrack.file}.ogg`
  document.querySelector("#source-WAV").src = `./media/${currentTrack.file}.wav`
  updateVisual();
  let paused = audioPlayer.paused;
  audioPlayer.load()
  if (!paused) { audioPlayer.play(); }
}

function updateVisual() {
  document.querySelector("#title").textContent = currentTrack.name;
  document.querySelector("#artist").textContent = currentTrack.artist;
  document.querySelectorAll(".card-img-top").forEach(image => {
    if (image.src.includes(currentTrack.photo)) {
      image.style.padding = "5px";
      image.style.borderRadius = "25px 0 25px 0";
      image.style.transform = "translateY(-4px) scale(1.075) rotate(1.5deg)"
    } else {
      image.style.borderRadius = "";
      image.style.border = "";
      image.style.transform = "";
    }
  })
}