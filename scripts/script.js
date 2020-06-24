const audioPlayer = document.querySelector("#audio-player");
const volume = document.querySelector("#volume");
const playPause = document.querySelector("#play-pause");
const trackPosition = document.querySelector("#track-position");
let currentTrack = media[0];

volume.value = audioPlayer.volume;
loadTrack();

setInterval(() => {
  trackPosition.value = audioPlayer.currentTime;
  if (audioPlayer.currentTime === audioPlayer.duration) {
    nextTrack();
  }
}, 50)

audioPlayer.onloadeddata = () => {
  if (audioPlayer.readyState > 1) { trackPosition.max = Math.floor(audioPlayer.duration); }
}

// Track position
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
volume.oninput = () => audioPlayer.volume = volume.value;

document.querySelector("#volume-down").addEventListener("click", () => {
  if (audioPlayer.volume > 0) {
    audioPlayer.volume -= 0.05;
    volume.value = audioPlayer.volume;
  }
})

document.querySelector("#volume-up").addEventListener("click", () => {
  if (audioPlayer.volume < 1) {
    audioPlayer.volume += 0.05;
    volume.value = audioPlayer.volume;
  }
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
  else if (currentTrack === media[0]) { currentTrack = media[media.length - 1]; }
  else { currentTrack = media[media.indexOf(currentTrack) - 1]; }
  loadTrack()
}

function nextTrack() {
  if (currentTrack === media[media.length - 1]) {
    currentTrack = media[0]
  } else {
    currentTrack = media[media.indexOf(currentTrack) + 1];
  }
  loadTrack()
}

function loadTrack() {
  document.querySelector("#source-MP3").src = `./media/${currentTrack.file}.mp3`
  document.querySelector("#source-OGG").src = `./media/${currentTrack.file}.ogg`
  document.querySelector("#source-WAV").src = `./media/${currentTrack.file}.wav`
  updateVisual();
  let paused = audioPlayer.paused;
  audioPlayer.load()
  audioPlayer.currentTime = 0;
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