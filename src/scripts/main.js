const intervals = [0, 20, 40, 60, 80, 100];
let value = 0;

// Create element and add class
function createElement(elementType, className) {
  const newElement = document.createElement(elementType);
  newElement.classList.add(className);

  return newElement;
}

function hideElement(element) {
  element.classList.add('hidden');
}

// Render single value
function renderValue(currentElement, value) {
  if (Array.isArray(value)) {
    currentElement.textContent = '[' + value.join(', ') + ']';
  } else {
    currentElement.textContent = value;
  }

  currentElement.classList.remove('hidden');
}

// Render whole data block
function renderData(arr, val, res = [-Infinity, Infinity]) {
  const arrOutput = document.querySelector('.intervals');
  const valOutput = document.querySelector('.value');
  const resOutput = document.querySelector('.result');

  renderValue(arrOutput, arr);
  arrOutput.addEventListener('click', (e) => renderArrayItemList(e, arr));

  renderValue(valOutput, val);
  valOutput.addEventListener('click', renderInput);

  renderValue(resOutput, res);
}

// Create input form for value editing
function createForm() {
  const formElement = createElement('form', 'data__form');
  const inputElement = createElement('input', 'data__input');
  formElement.append(inputElement);

  return formElement;
}

// Render input form for value editing
function renderInput(e) {
  const currentElement = e.target;
  const currentContainer = currentElement.closest('.intervals__item') || currentElement.closest('.data__wrapper');

  const form = createForm();
  currentContainer.append(form);

  hideElement(currentElement);
}

// Create editable array line
function createArrayItemList(arr) {
  const listElement = createElement('ol', 'intervals__list');
  
  arr.forEach((item, index) => {
    const listItemElement = createElement('li', 'intervals__item');
    listItemElement.dataset.id = index;

    const listItemTextElement = createElement('span', 'intervals__value');
    listItemTextElement.textContent = item;
    listItemElement.append(listItemTextElement);
    
    listElement.append(listItemElement);
  })

  return listElement;
}

// Render editable array line
function renderArrayItemList(e, arr) {
  const currentElement = e.target;
  const listElement = createArrayItemList(arr);
  listElement.addEventListener('click', renderInput);

  const currentContainer = currentElement.closest('.data__wrapper');
  currentContainer.append(listElement);

  hideElement(currentElement);
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
        mid < arr.length - 1 ? arr[mid + 1] : Infinity,
      ];

    if (arr[mid] < num) start = mid + 1;
    if (arr[mid] > num) end = mid - 1;
  }

  return [arr[end], arr[start]];
}

renderData(intervals, value, findInterval(intervals, value));
