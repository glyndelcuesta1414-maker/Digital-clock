const clock = document.getElementById("clock");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
const timerDisplay = document.getElementById("timer-display");

function updateClock() {
  const now = new Date();
  let h = now.getHours().toString().padStart(2, "0");
  let m = now.getMinutes().toString().padStart(2, "0");
  let s = now.getSeconds().toString().padStart(2, "0");
  clock.textContent = `${h}:${m}:${s}`;
}
setInterval(updateClock, 1000);
updateClock();

let countdown;
let totalSeconds = 0;

function startTimer() {
  if (countdown) return;
  let mins = parseInt(minutesInput.value) || 0;
  let secs = parseInt(secondsInput.value) || 0;
  totalSeconds = mins * 60 + secs;
  if (totalSeconds <= 0) return;
  countdown = setInterval(() => {
    totalSeconds--;
    let m = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
    let s = (totalSeconds % 60).toString().padStart(2, "0");
    timerDisplay.textContent = `${m}:${s}`;
    if (totalSeconds <= 0) {
      clearInterval(countdown);
      countdown = null;
      timerDisplay.textContent = "00:00";
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(countdown);
  countdown = null;
}

function resetTimer() {
  stopTimer();
  minutesInput.value = "";
  secondsInput.value = "";
  timerDisplay.textContent = "00:00";
}

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);
