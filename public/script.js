let countdown;
let countdownType;
const timerDisplay = document.querySelector("#time-left");
const endTime = document.querySelector("#end-time");
const buttons = document.querySelectorAll("[data-time]");

function startTimer(seconds) {
  clearInterval(countdown);
  const endTime = Date.now() + seconds * 1000;
  displayEndTime(endTime);

  displayTimer(seconds);
  countdown = setInterval(() => {
    const now = Date.now();
    secondsLeft = Math.round((endTime - now) / 1000);
    displayTimer(secondsLeft);
    if (secondsLeft <= 0) {
      clearInterval(countdown);
      alternateTimers();
      return;
    }
  }, 1000);
}

function displayTimer(secondsLeft) {
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timeFormatted = `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  let circleEmoji = "";
  if (countdownType == "work") circleEmoji = "🟠 ";
  if (countdownType == "break") circleEmoji = "🔵 ";

  let titleText = "";
  if (minutes == 0) {
    if (countdownType == "work") titleText = "Break soon!";
    if (countdownType == "break") titleText = "Work soon!";
  } else {
    titleText = `${Math.ceil(secondsLeft / 60)}m left`;
  }

  document.title = circleEmoji + titleText;
  timerDisplay.innerHTML = timeFormatted;
}

function displayEndTime(date) {
  const finishDate = new Date(date);
  const formattedTime = new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(finishDate);
  endTime.innerHTML = formattedTime;
}

function alternateTimers() {
  const justDoneWorking = countdownType == "work";
  const justDoneWithBreak = countdownType == "break";
  if (justDoneWorking) {
    const breakButton = document.querySelector('button[data-type="break"]');
    breakButton.click();
  } else if (justDoneWithBreak) {
    const workButton = document.querySelector('button[data-type="work"]');
    workButton.click();
  }
}

buttons.forEach((el) => {
  el.addEventListener("click", (e) => {
    countdownType = e.target.dataset.type;
    document.body.dataset.type = countdownType;
    startTimer(e.target.dataset.time);
    // play bell
    const audioElement = document.querySelector(`#${countdownType}Bell`);
    audioElement.currentTime = 0;
    audioElement.play();
  });
});
