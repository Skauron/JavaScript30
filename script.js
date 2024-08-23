const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector("#speak");
const stopButton = document.querySelector("#stop");

const myKeysValues = window.location.search;
const urlParams = new URLSearchParams(myKeysValues);
const customMsg = urlParams.get("msg");

msg.text = document.querySelector('[name="text"]').value;


function populateVoices() {
  voices = this.getVoices();
  voicesDropdown.innerHTML = voices
    .map(
      (voice) =>
        `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`
    )
    .join("");
}

function setVoice() {
  msg.voice = voices.find((voice) => voice.name === this.value);
  toggle();
}

function toggle(startOver = true) {
  speechSynthesis.cancel();
  if (startOver) 
    speechSynthesis.speak(msg);
}

function setOption() {
  msg[this.name] = this.value;
  toggle();
}

function checkMsg() {
  if (customMsg !== null) {
    options[2].textContent = customMsg;
    msg["text"] = customMsg;
    speechSynthesis.speak(msg);
  }
}

speechSynthesis.addEventListener("voiceschanged", populateVoices);
voicesDropdown.addEventListener("change", setVoice);
options.forEach((option) => {
  option.addEventListener("change", setOption);
});
speakButton.addEventListener("click", toggle);
stopButton.addEventListener("click", () => toggle(false));
checkMsg();
