let display = document.getElementById("result");

function appendToDisplay(val) {
  if (display.innerHTML === "0") {
    display.innerHTML = val;
  } else {
    display.innerHTML += val;
  }
}

function clearDisplay() {
  display.innerHTML = "0";
}

function calculate() {
  display.innerHTML = eval(display.innerHTML);
}
