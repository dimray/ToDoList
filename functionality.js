import { createButton, createDiv, createLabel } from './factoryFunctions.js';

export let category = document.querySelector(".category-header").textContent;
export const form = document.querySelector("#add-item-form");
export const listDisplay = document.querySelector(".list-display");
export let toDoList = JSON.parse(localStorage.getItem("todoList"));
export let toDoObject;
export const { format, addWeeks, isBefore, parseISO, parse } = require('date-fns');
export const today = format(new Date(), 'dd.MM.yyyy');


function formatDate(date) {
  const formattedDate = format(new Date(date), 'dd.MM.yyyy');
  return formattedDate;
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

function displayList() {
  category = document.querySelector(".category-header").textContent;

  const itemsList = (JSON.parse(localStorage.getItem("todoList")));
  const itemsObject = itemsList[0];

  listDisplay.innerHTML = "";

  const categoriesInObject = Object.keys(itemsObject);
  categoriesInObject.forEach((key, index) => {

    if (key === category) {
      for (const item in itemsObject[category]) {

        const displayLabel1 = createLabel({ textContent: item, classNames: ["listItem"] });
        const displayLabel2 = createLabel({ textContent: itemsObject[category][item], classNames: ["listItem"] })
        const completedButton = createButton({ textContent: "delete", classNames: ["completed-btn", "listItem", "listBtn"] })
        const listDisplayDiv = createDiv({ classNames: ["listDisplayDiv"], children: [displayLabel1, displayLabel2, completedButton] });

        listDisplay.appendChild(listDisplayDiv);
      };
    }
  });
}

export { formatDate, addItem, displayList };