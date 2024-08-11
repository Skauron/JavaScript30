const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const filled = player.querySelector(".progress__filled");
const playBtn = player.querySelector(".player__button");
const fullScreenBtn = player.querySelector(".fullscreen");
const ranges = player.querySelectorAll(".player__slider");
const skipBtns = player.querySelectorAll("[data-skip]");

function togglePlay() {
  const method = video.paused ? "play" : "pause";
  video[method]();
}

function updateButton() {
  const icon = video.paused ? "►" : "❚❚";
  playBtn.textContent = icon;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress(){
  const percent = (video.currentTime / video.duration) * 100;
  filled.style.flexBasis = `${percent}%`;
}

function scrub(e){
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function fullScreen(){
  video.requestFullscreen();
}

playBtn.addEventListener("click", togglePlay);
fullScreenBtn.addEventListener("click", fullScreen);
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);
skipBtns.forEach((btn) => {
  btn.addEventListener("click", skip);
});
ranges.forEach((range) => {
  range.addEventListener("change", handleRangeUpdate);
  range.addEventListener("mousemove", handleRangeUpdate);
});

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => mousedown = true);
progress.addEventListener("mouseup", () => mousedown = false);
