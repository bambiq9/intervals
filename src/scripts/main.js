const intervals = [0, 20, 40, 60, 80, 100];
let value = 0;

function renderData(arr, val, res = [-Infinity, Infinity]) {
	let arrOutput = document.querySelector(".intervals");
	let valOutput = document.querySelector(".value");
	let resOutput = document.querySelector(".result");

	arrOutput.textContent = "[" + arr.join(", ") + "]";
	resOutput.textContent = "[" + res.join(", ") + "]";
	
	valOutput.textContent = val;
	valOutput.addEventListener("click", renderInput);
}

function renderInput(e) {
	const currentSpan = e.target;

	const formElement = document.createElement("form");
	formElement.classList.add("value__form");

	const inputElement = document.createElement("input");
	inputElement.classList.add("value__form-input");

	formElement.append(inputElement);
	formElement.addEventListener("submit", renderValue);

	currentSpan.replaceWith(formElement);
}

function renderValue(e) {
	e.preventDefault();

	const formElement = document.querySelector(".value__form");
	const inputElement = document.querySelector(".value__form-input");
	value = inputElement.value ? Number(inputElement.value) : value;

	const valOutput = document.createElement("span");
	valOutput.classList.add("data__value", "value");
	valOutput.textContent = String(value);
	valOutput.addEventListener("click", renderInput);

	formElement.replaceWith(valOutput);
	renderData(intervals, value, findInterval(intervals, value));
}

function findInterval(arr, num) {
	if (num < arr[0]) return [-Infinity, arr[0]];
	if (num > arr[arr.length - 1]) return [arr[arr.length - 1], Infinity];

	let start = 0;
	let end = intervals.length - 1;

	while (start <= end) {
		let mid = Math.floor((start + end) / 2);

		if (arr[mid] === num)
			return [
				mid > 0 ? arr[mid - 1] : -Infinity,
				mid < arr.length - 1 ? arr[mid + 1] : Infinity
			];

		if (arr[mid] < num) start = mid + 1;
		if (arr[mid] > num) end = mid - 1;
	}

	return [arr[end], arr[start]];
}

renderData(intervals, value, findInterval(intervals, value));
