
const form = document.querySelector("#add-item-form");
const listDisplay = document.querySelector(".list-display");
const addItemBtn = document.querySelector(".add-item-btn");
let category;
let toDoList;
let toDoObject;


document.addEventListener("DOMContentLoaded", () => {
  toDoList = JSON.parse(localStorage.getItem("todoList"));

  if (toDoList) {
    toDoObject = toDoList[0];
    displayList();
  } else toDoList = [];
});

document.addEventListener("click", (e) => {

  if (e.target === addItemBtn) {
    listDisplay.classList.add("hidden");
    addItemBtn.classList.add("hidden");
    form.classList.remove("hidden");
  }
  if (e.target.className.includes("form-submit-btn")) {
    form.classList.add("hidden")
    listDisplay.classList.remove("hidden")
    addItemBtn.classList.remove("hidden");
    addItem();
    displayList();
  }
  if (e.target.className.includes("completed-btn")) {
    const itemToRemove = e.target.parentNode.querySelector(".listItem").textContent;
    removeItem(itemToRemove);
    e.target.parentNode.remove();
  }
})

function setCategory() {
  let category = document.querySelector(".category").textContent;
  return { category };
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function addItem() {
  category = document.querySelector(".category").textContent;
  const todoItem = form.elements["todoitem"].value;
  const todoDate = form.elements["duedate"].value;

  if (localStorage.getItem("todoList") === null) {
    toDoObject = {};
    toDoObject[category] = {};
    toDoObject[category][todoItem] = todoDate;
  } else {
    toDoList = JSON.parse(localStorage.getItem("todoList"));
    toDoObject = toDoList[0];
    if (toDoObject[category] === undefined) {
      toDoObject[category] = {};
      toDoObject[category][todoItem] = todoDate;
    } else {
      toDoObject[category][todoItem] = todoDate;
    };
  }

  toDoList = [];
  toDoList.push(toDoObject);

  localStorage.removeItem("todoList");
  localStorage.setItem("todoList", JSON.stringify(toDoList));
}

function removeItem(itemToRemove) {
  category = document.querySelector(".category").textContent;
  delete toDoList[0][category][itemToRemove];

  localStorage.removeItem("todoList");
  localStorage.setItem("todoList", JSON.stringify(toDoList));
}


function displayList() {

  category = document.querySelector(".category").textContent;
  const itemsList = (JSON.parse(localStorage.getItem("todoList")));
  const itemsObject = itemsList[0];


  listDisplay.innerHTML = "";

  //loop through itemsObject and display key:value from that category

  const categories = Object.keys(itemsObject);
  categories.forEach((key, index) => {

    if (key === category) {
      for (const item in itemsObject[category]) {
        const displayLabel1 = document.createElement("label");
        displayLabel1.classList.add("listItem");
        const displayLabel2 = document.createElement("label");
        displayLabel2.classList.add("listItem");
        const listDisplayDiv = document.createElement("div");
        listDisplayDiv.classList.add("listDisplayDiv");
        const completedButton = document.createElement("button");
        completedButton.classList.add("completed-btn");
        completedButton.classList.add("listItem");
        completedButton.classList.add("listBtn");
        completedButton.innerText = "delete";

        displayLabel1.textContent = (item);
        displayLabel2.textContent = (itemsObject[category][item]);
        listDisplayDiv.appendChild(displayLabel1);
        listDisplayDiv.appendChild(displayLabel2);
        listDisplayDiv.appendChild(completedButton);
        listDisplay.appendChild(listDisplayDiv);
      };
    }
  });
}
    //   itemsObject[category].forEach(([key, value]) => {
    //     const displayLabel1 = document.createElement("label");
    //     displayLabel1.classList.add("listItem");
    //     const displayLabel2 = document.createElement("label");
    //     displayLabel2.classList.add("listItem");
    //     const listDisplayDiv = document.createElement("div");
    //     listDisplayDiv.classList.add("listDisplayDiv");
    //     const completedButton = document.createElement("button");
    //     completedButton.classList.add("completed-btn");
    //     completedButton.classList.add("listItem");
    //     completedButton.classList.add("listBtn");
    //     completedButton.innerText = "delete";

    //     displayLabel1.textContent = (key);
    //     displayLabel2.textContent = (value);
    //     listDisplayDiv.appendChild(displayLabel1);
    //     listDisplayDiv.appendChild(displayLabel2);
    //     listDisplayDiv.appendChild(completedButton);
    //     listDisplay.appendChild(listDisplayDiv);
    //   });
    // };






