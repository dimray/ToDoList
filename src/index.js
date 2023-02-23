const { format, addWeeks } = require('date-fns');
const { isBefore, parseISO } = require('date-fns');
const { parse } = require('date-fns');
const today = format(new Date(), 'dd.MM.yyyy');


const form = document.querySelector("#add-item-form");
const categoryForm = document.querySelector("#category-form");
const listDisplay = document.querySelector(".list-display");
const addItemBtn = document.querySelector(".add-item-btn");
const newCategoryButton = document.createElement("button");
const addCategoryButton = document.querySelector(".add-new-category");
let category = document.querySelector(".category-header").textContent;
let toDoList;
let toDoObject;


document.addEventListener("DOMContentLoaded", () => {
  toDoList = JSON.parse(localStorage.getItem("todoList"));

  if (toDoList) {
    toDoList = JSON.parse(localStorage.getItem("todoList"));
    toDoObject = toDoList[0];

    Object.keys(toDoObject).forEach((key, index) => {
      if (key != "To Do") {

        const innerSidebar = document.querySelector(".inner-sidebar");
        const categoryButton = document.createElement("button");
        const delButton = document.createElement("button");
        const categoryDiv = document.createElement("div");
        categoryButton.classList.add("sidebar-btn", "category", "sidebar-cat-btn");
        categoryButton.textContent = key;
        delButton.classList.add("del-category-btn");
        delButton.textContent = "X";
        categoryDiv.classList.add("category-div");
        categoryDiv.appendChild(categoryButton);
        categoryDiv.appendChild(delButton);
        innerSidebar.appendChild(categoryDiv);
        // categoryForm.insertBefore(categoryButton, addCategoryButton);
      }

      displayList();
    });
  } else toDoList = [];


});

document.addEventListener("click", (e) => {

  let inputElement = categoryForm.elements["input-category"]
  let newCategory = inputElement.value;
  const newCategoryButton = document.createElement("button");
  const deleteCategoryButton = document.createElement("button");
  const categoryButtonsDiv = document.createElement("div");

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
  if (e.target.className.includes("add-new-category")) {
    document.querySelector(".input-category").classList.remove("hidden");
    document.querySelector(".add-category-btn").classList.remove("hidden");
  }
  if (e.target.className.includes("add-category-btn")) {


    newCategoryButton.classList.add("sidebar-btn", "category", "sidebar-cat-btn");
    newCategoryButton.textContent = newCategory;
    document.querySelector(".category-header").textContent = newCategory;

    deleteCategoryButton.classList.add("del-category-btn");
    deleteCategoryButton.textContent = "X";
    categoryButtonsDiv.classList.add("category-div");

    categoryButtonsDiv.appendChild(newCategoryButton);
    categoryButtonsDiv.appendChild(deleteCategoryButton);
    categoryForm.insertBefore(categoryButtonsDiv, addCategoryButton);
    inputElement.value = "";
    document.querySelector(".input-category").classList.add("hidden");
    document.querySelector(".add-category-btn").classList.add("hidden");

    displayList();
  }

  if (e.target.className.includes("sidebar-cat-btn")) {
    category = e.target.textContent;
    document.querySelector(".category-header").textContent = category;
    displayList();
  };

  if (e.target.className.includes("del-category-btn")) {
    toDoList = JSON.parse(localStorage.getItem("todoList"));
    toDoObject = toDoList[0];
    let parent = e.target.parentNode;
    let categoryToDelete = parent.querySelector(".sidebar-cat-btn").textContent;

    delete toDoObject[categoryToDelete];
    toDoList = [];
    toDoList.push(toDoObject);
    localStorage.removeItem("todoList");
    localStorage.setItem("todoList", JSON.stringify(toDoList));
    e.target.parentNode.remove();
    document.querySelector(".category-header").textContent = "To Do";
    displayList();
  }

  if (e.target.className.includes("today")) {
    toDoList = JSON.parse(localStorage.getItem("todoList"));
    toDoObject = toDoList[0];

    for (let key in toDoObject) {
      const nestedKeys = Object.keys(toDoObject[key])
      console.log(nestedKeys);
      for (let i = 0; i < nestedKeys.length; i++) {
        if (toDoObject[key][nestedKeys[i]] === today) {
          const todaysItem = nestedKeys[i];
          const todaysDate = toDoObject[key][todaysItem];

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

          displayLabel1.textContent = (todaysItem);
          displayLabel2.textContent = (todaysDate);
          listDisplayDiv.appendChild(displayLabel1);
          listDisplayDiv.appendChild(displayLabel2);
          listDisplayDiv.appendChild(completedButton);
          listDisplay.appendChild(listDisplayDiv);
        }
      }
    }
  }

  if (e.target.className.includes("week")) {
    toDoList = JSON.parse(localStorage.getItem("todoList"));
    toDoObject = toDoList[0];

    const currentDate = new Date();
    console.log(currentDate);

    let nextWeek = addWeeks(currentDate, 1);

    // nextWeek = format(nextWeek, 'dd.MM.yyyy');
    console.log(nextWeek);




    for (let key in toDoObject) {
      const nestedKeys = Object.keys(toDoObject[key])
      for (let i = 0; i < nestedKeys.length; i++) {

        const dateString = (toDoObject[key][nestedKeys[i]]);
        const taskDate = parse(dateString, 'dd.MM.yyyy', new Date());
        console.log(taskDate);
        console.log(nextWeek);

        if (isBefore(taskDate, nextWeek)) {
          const weekItem = nestedKeys[i];
          const weekDate = toDoObject[key][weekItem];

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

          displayLabel1.textContent = (weekItem);
          displayLabel2.textContent = (weekDate);
          listDisplayDiv.appendChild(displayLabel1);
          listDisplayDiv.appendChild(displayLabel2);
          listDisplayDiv.appendChild(completedButton);
          listDisplay.appendChild(listDisplayDiv);
        }
      }
    }
  }



});

function formatDate(date) {
  const formattedDate = format(new Date(date), 'dd.MM.yyyy');
  return formattedDate;
}



function setCategory() {
  let category = document.querySelector(".category").textContent;
  return { category };
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function addItem() {
  category = document.querySelector(".category-header").textContent;;
  const todoItem = form.elements["todoitem"].value;
  const dateFormatted = formatDate(form.elements["duedate"].value);
  const todoDate = dateFormatted;

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
  category = document.querySelector(".category-header").textContent;;
  delete toDoList[0][category][itemToRemove];

  localStorage.removeItem("todoList");
  localStorage.setItem("todoList", JSON.stringify(toDoList));
}


function displayList() {

  category = document.querySelector(".category-header").textContent;
  const itemsList = (JSON.parse(localStorage.getItem("todoList")));
  const itemsObject = itemsList[0];




  listDisplay.innerHTML = "";

  //loop through itemsObject and display key:value from that category

  const categoriesInObject = Object.keys(itemsObject);
  categoriesInObject.forEach((key, index) => {

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