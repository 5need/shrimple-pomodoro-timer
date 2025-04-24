let countdown;
let countdownType;
const timerDisplay = document.querySelector("#time-left");
const endTime = document.querySelector("#end-time");
const buttons = document.querySelectorAll("[data-time]");

function startTimer(seconds) {
  clearInterval(countdown);
  displayEndTime(Date.now() + seconds * 1000);

  displayTimer(seconds);
  countdown = setInterval(() => {
    seconds--;
    displayTimer(seconds);
    if (seconds <= 0) {
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

  document.title = circleEmoji + timeFormatted;
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
  });
});
