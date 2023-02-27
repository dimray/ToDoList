

// import { buttonClicks } from './modules/eventListeners.js';
// import { createButton, createDiv, createLabel } from './modules/factoryFunctions.js';


// import { formatDate, addItem, displayList } from './modules/functionality.js';
// import { category, form, listDisplay } from './modules/functionality.js';
// import { format, addWeeks, isBefore, parseISO, parse, today } from './modules/functionality.js';

import { onLoad, buttonClicks } from './modules/eventListeners.js';

onLoad();
buttonClicks();


// const { format, addWeeks, isBefore, parseISO, parse } = require('date-fns');
// const today = format(new Date(), 'dd.MM.yyyy');


// const form = document.querySelector("#add-item-form");
// const listDisplay = document.querySelector(".list-display");

// const category = document.querySelector(".category-header").textContent;





// function removeItem(className, itemToRemove) {
//   let toDoList = JSON.parse(localStorage.getItem("todoList"));
//   let category = document.querySelector(".category-header").textContent;
//   let parent = document.querySelector(`.${className}`).parentNode;
//   let toDoObject = toDoList[0];

//   if (className === "completed-btn") {
//     delete toDoObject[category][itemToRemove];
//   } else if (className === "del-category-btn") {
//     delete toDoObject[itemToRemove];
//     document.querySelector(".category-header").textContent = "To Do";
//     displayList();
//   }

//   toDoList = [];
//   toDoList.push(toDoObject);
//   localStorage.removeItem("todoList");
//   localStorage.setItem("todoList", JSON.stringify(toDoList));
//   parent.remove();
// }













