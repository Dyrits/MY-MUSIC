// VARIABLES //
const player = document.querySelector("#audio-player");
let track = media[0];

// jQuery VARIABLES //
const $volume = $("#volume");
const $position = $("#track-position");


// READY //
$(function() {
  // INITIALIZATION //

  // Volume
  $("#volume").val(1);

  // Refresh
  setInterval(() => {
    if ($position.attr("max") !== Math.floor(player.duration)) {
      $position.attr("max", Math.floor(player.duration));
    }
    $position.val(player.currentTime);
    if (player.currentTime === player.duration) {
      nextTrack();
    }
  }, 50);


  // EVENTS LISTENER  //

  // BUTTON >> Volume Down
  $("#volume-down").on("click", () => {
    if (player.volume > 0) {
      player.volume -= 0.05;
      adjustVolume()
    }
  })

  // BUTTON >> Volume Up
  $("#volume-up").on("click", () => {
    if (player.volume < 1) {
      player.volume += 0.05;
      adjustVolume()
    }
  })

  // RANGE >> Volume
  $volume.on("input", () => {
    player.volume = $volume.val();
  });

  // BUTTON >> Play/Pause
  $("#play-pause").on("click", () => {
    player.paused ? play() : pause();
  })

  // BUTTON >> Next
  $("#next").on("click", () => {
    nextTrack();
    loadTrack();
  })
  $("#previous").on("click", () => {
    previousTrack();
    loadTrack();
  })

  // RANGE >> Track position
  $position.on("input", () => {
    player.currentTime = $position.val();
  })

  // CARDS >> Select track
  $("#covers").children().each((index, card) => {
    $(card).on("click", () => {
      track = media[index];
      loadTrack();
    })
    $(card).on("dblclick", () => {
      track = media[index];
      loadTrack();
      play();
    })
  })

})


// FUNCTIONS  //

// Adjust RANGE >> Volume
function adjustVolume() { $volume.val(player.volume); }

// Play
function play() {
  $(".fa-play").toggleClass("fa-pause fa-play");
  player.play();
}

// Pause
function pause() {
  $(".fa-pause").toggleClass("fa-pause fa-play");
  player.pause();
}

// Next/Previous track
function nextTrack() { track = track === media[media.length - 1] ? media[0] : media[media.indexOf(track) + 1]; }
function previousTrack() { track = player.currentTime > player.duration / 5 ?
  track : track === media[0] ? media[media.length - 1] : media[media.indexOf(track) - 1]; }

// Load track
function loadTrack() {
  $("#source-MP3").attr("src", `./media/${track.file}.mp3`);
  $("#source-OGG").attr("src", `./media/${track.file}.ogg`);
  $("#source-WAV").attr("src", `./media/${track.file}.wav`);
  updateInfo();
  let playing = !player.paused;
  player.load();
  if (playing) { player.play(); }
}

// Update track information
function updateInfo() {
  $("#title").text(track.name);
  $("#artist").text(track.artist);
  $(".card-img-top").each((index, image) => {
    if ($(image).attr("src").includes(track.photo)) {
      $(image).css("padding", "5px");
      $(image).css("border-radius", "25px 0 25px 0");
      $(image).css("transform", "translateY(-4px) scale(1.075) rotate(1.5deg)")
    } else {
      $(image).css("padding", "");
      $(image).css("border-radius", "");
      $(image).css("transform", "")
    }
  })
}

