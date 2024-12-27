// Create element and add class
export function createElement(elementType, className) {
  const newElement = document.createElement(elementType);
  newElement.classList.add(className);

  return newElement;
}

// Hide element visually
export function hideElement(element) {
  element.classList.add('hidden');
}