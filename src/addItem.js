function createForm() {
  const form = document.createElement("form");
  form.classList.add("form");

  const toDoLabel = document.createElement("label");
  toDoLabel.textContent = "To do:";
  toDoLabel.classList.add("form-label");

  const toDoItem = document.createElement("input");
  toDoItem.type = "text";
  toDoItem.classList.add("form-item");

  toDoLabel.appendChild(toDoItem);

  const dateLabel = document.createElement("label");
  dateLabel.textContent = "Due date:";
  dateLabel.classList.add("form-label");

  const dueDate = document.createElement("input");
  dueDate.type = "date";
  dueDate.classList.add("form-item");

  dateLabel.appendChild(dueDate);

  const submitFormBtn = document.createElement("button");
  submitFormBtn.textContent = "Submit";
  submitFormBtn.classList.add("btn", "form-btn");

  form.appendChild(toDoLabel);
  form.appendChild(dateLabel);
  form.appendChild(submitFormBtn);


  return form;
}

export function loadForm() {
  const main = document.querySelector(".main");
  main.textContent = "";
  main.appendChild(createForm());
}


