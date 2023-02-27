function createButton(buttonData) {
  const button = document.createElement("button");
  button.innerText = buttonData.textContent;
  button.classList.add(...buttonData.classNames);
  return button;
}

function createDiv(divData) {
  const div = document.createElement("div");
  div.classList.add(...divData.classNames);
  divData.children.forEach(child => {
    div.appendChild(child);
  });
  return div;
}

function createLabel(labelData) {
  const label = document.createElement("label");
  label.textContent = labelData.textContent;
  label.classList.add(...labelData.classNames);
  return label;
}

export { createButton, createDiv, createLabel };

