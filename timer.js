let timer = parent.document.querySelector("#timer");
timer.innerHTML = "00:00";

let seconds = 0;
let minutes = 0;
let viewCounter = 0;
let timerInterval;

function getDate() {
  let year = new Date().getFullYear();

  let month = new Date().getMonth() + 1;
  month = month < 10 ? "0" + month : month;

  let day = new Date().getDate();
  day = day < 10 ? "0" + day : day;

  return year + ":" + month + ":" + day;
}

function clearTimer() {
  timer.innerHTML = "00:00";

  seconds = 0;
  minutes = 0;
  clearInterval(timerInterval);
}

function setTimer() {
  if (viewCounter === 3) {
    timer.innerHTML = getDate();
  } else {
    seconds ++;
    if (seconds === 60) {
      seconds = 0;
      minutes ++;
    }
  
    let secondsString = seconds < 10 ? "0" + seconds : seconds;
    let minutesString = minutes < 10 ? "0" + minutes : minutes;
  
    timer.innerHTML = minutesString + ":" + secondsString;
  }
}

let observer = new IntersectionObserver(function (entries, observer) {
  let entry = entries[0];
  if (!entry) return;

  if (entry.intersectionRatio > 0) {
    viewCounter++;

    timerInterval = setInterval(function () {
      setTimer();
    }, 1000);
  }

  if (entry.intersectionRatio <= 0) {
    clearTimer();
  }

  if (viewCounter > 3) {
    viewCounter = 0;
  }
});

observer.observe(timer);
