import Range from "./components/range/Range.js";

const alignObject = (container, radius, numOfElement) => {
	container.innerHTML = "";
	for (let index = 0; index < numOfElement; index++) {
		const item = document.createElement("DIV");
		//item.textContent = index;
		//L'angle en dégré
		let angle = (index / numOfElement) * 360;

		//Conversion de l'angle en radian
		let angleInRadian = angle * (Math.PI / 180);
		let pos = {
			x: radius * Math.cos(angleInRadian),
			y: radius * Math.sin(angleInRadian),
		};

		item.classList.add("circle-child");
		item.style.left = `calc(50% + ${pos.x}px)`;
		item.style.top = ` calc(50% + ${pos.y}px)`;
		container.appendChild(item);
	}
};

//Default Values
let itemNumber = 12;
let radius = 30;
let step = 2;
let range = new Range(radius, step);

//Container
const container = document.querySelector(".circle-container");

//Setting Inputs
const inputRadius = document.getElementById("input-radius");
const inputItems = document.getElementById("input-items");
const inputStep = document.getElementById("input-step");

inputStep.value = range.step;
inputItems.value = itemNumber;
inputRadius.value = radius;

inputItems.onchange = (e) => {
	itemNumber = inputItems.value;
	alignObject(container, radius, itemNumber);
};

inputRadius.onchange = (e) => {
	radius = inputRadius.value;
	alignObject(container, radius, itemNumber);
};

inputStep.onchange = (e) => {
	range.changeStep(parseFloat(inputStep.value));
};

range.range.addEventListener("oninput", (event) => {
	radius = event.detail;
	inputRadius.value = radius;
	alignObject(container, radius, itemNumber);
});

alignObject(container, radius, itemNumber);
