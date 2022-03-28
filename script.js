const default_size = "16";
const default_color = "#000000"; //set default color to black

//Create Grid
const container_div = document.getElementById("grid-container");

function makeGrid() {
  for (let i = 0; i < 256; i++) {
    const cell = document.createElement("div");
    cell.classList.add("grid-item");
    cell.addEventListener("mouseover", defaultColor);
    container_div.appendChild(cell);
  }
}

//Default Color function
function defaultColor(event) {
  event.target.style.backgroundColor = default_color;
}

//Slider value UI
const sizeSlider_input = document.getElementById("sizeSlider");
const sliderValue_div = document.getElementById("sliderValue");

sizeSlider_input.oninput = (e) => updateSliderValue(e.target.value);
function updateSliderValue(value) {
  sliderValue_div.innerHTML = `${value} x ${value}`;
}

//Remove previous grid for changing grid size
function removeCells(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

//Change grid size
sizeSlider_input.addEventListener("input", changeSize);

function changeSize() {
  const value = sizeSlider_input.value;
  clearFunction();
  removeCells(container_div);
  container_div.setAttribute(
    "style",
    `grid-template-columns: repeat(${value},
        2fr); grid-template-rows: repeat(${value}, 2fr);`
  );
  for (let i = 0; i < value * value; i++) {
    const cell = document.createElement("div");
    cell.classList.add("grid-item");
    cell.addEventListener("mouseover", defaultColor);
    container_div.appendChild(cell);
  }
}

//Clear grid button
const clear = document.getElementById("clearbtn");
clear.addEventListener("click", clearFunction);

function clearFunction() {
  cell = container_div.children;
  let value = sizeSlider_input.value;
  for (let i = 0; i < cell.length; i++) {
    cell[i].style.backgroundColor = "white";
  }
}

//Rainbow button
const rainbow = document.getElementById("rainbowbtn");
rainbow.addEventListener("click", rainbowfunc);

function rainbowfunc() {
  let value = sizeSlider_input.value;
  const cell = container_div.children;
  for (let i = 0; i < value * value; i++)
    cell[i].addEventListener("mouseover", rainbowBackground);
}

function rainbowBackground(event) {
  event.target.style.backgroundColor = randomColor();
}

function randomColor() {
  let characters = "0123456789ABCDEF";
  let hash = "#";
  for (let i = 0; i < 6; i++) {
    color = hash += characters[Math.floor(Math.random() * 16)];
  }
  return color;
}

//Black mode button
const blackMode = document.getElementById("blackbtn");
blackMode.addEventListener("click", blackModeFunc);

function blackModeFunc() {
  let value = sizeSlider_input.value;
  let cell = container_div.children;
  for (let i = 0; i < value * value; i++) {
    cell[i].addEventListener("mouseover", blackInk);
  }
}

function blackInk(event) {
  event.target.style.backgroundColor = default_color;
}

//Color Selector
const colorSelector = document.getElementById("colorSelector");
colorSelector.addEventListener("input", colorModeFunc);

function colorModeFunc() {
  let value = sizeSlider_input.value;
  let cell = container_div.children;
  for (let i = 0; i < value * value; i++) {
    cell[i].addEventListener("mouseover", colorInk);
  }
}

function colorInk(event) {
  event.target.style.backgroundColor = colorSelector.value;
}

//Load default size grid
window.onload = () => {
  makeGrid(default_size);
};
