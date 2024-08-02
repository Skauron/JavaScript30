const hoursHand = document.querySelector(".hour-hand");
const minsHand = document.querySelector(".min-hand");
const secondsHand = document.querySelector(".second-hand");

function setData() {
  const now = new Date();

  const hours = now.getHours();
  const hoursDegrees = (hours / 12) * 360 + 90;

  const mins = now.getMinutes();
  const minsDegrees = (mins / 60) * 360 + 90;

  const seconds = now.getSeconds();
  const secondsDegrees = (seconds / 60) * 360 + 90;

  if (seconds === 0) {
    secondsHand.style.setProperty("transition", "");
    minsHand.style.setProperty("transition", "");
    hoursHand.style.setProperty("transition", "");
  }else if(seconds === 1){
    init();
  }

  hoursHand.style.transform = `rotate(${hoursDegrees}deg)`;
  minsHand.style.transform = `rotate(${minsDegrees}deg)`;
  secondsHand.style.transform = `rotate(${secondsDegrees}deg)`;
}

function init() {
  secondsHand.style.setProperty("transition", "all  0.05s");
  secondsHand.style.setProperty(
    "transition-timing-function",
    "cubic-bezier(0.1, 2.7, 0.58, 1)"
  );
  hoursHand.style.setProperty("transition", "all  0.05s");
  hoursHand.style.setProperty(
    "transition-timing-function",
    "cubic-bezier(0.1, 2.7, 0.58, 1)"
  );
  minsHand.style.setProperty("transition", "all  0.05s");
  minsHand.style.setProperty(
    "transition-timing-function",
    "cubic-bezier(0.1, 2.7, 0.58, 1)"
  );
}

setInterval(setData, 1000);
init();
