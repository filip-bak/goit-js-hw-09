const bodyEl = document.body;

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
stopBtn.disabled = true;

let timerId = null;

//                  😔 TO BIG FUNCTION! 😔
// function switchButtonsQ({ firstBtnEl, secondBtnEl, disableFirstBtn = true }) {
//   let disableSecondBtn = false;

//   firstBtnEl.disabled = disableFirstBtn;
//   secondBtnEl.disabled = disableSecondBtn;

//   if (disableFirstBtn === false) {
//     disableSecondBtn = true;
//     firstBtnEl.disabled = disableFirstBtn;
//     secondBtnEl.disabled = disableSecondBtn;
//     return;
//   }
// }

function buttonSwitch({ trueOrder = true } = {}) {
  startBtn.disabled = trueOrder;
  trueOrder = !trueOrder;
  stopBtn.disabled = trueOrder;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBgColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

startBtn.addEventListener('click', () => {
  changeBgColor();

  timerId = setInterval(changeBgColor, 1000);

  buttonSwitch();
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);

  buttonSwitch({ trueOrder: false });
});
