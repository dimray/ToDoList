
import { formatDate, addItem, displayList } from './functionality.js';
import { category, form, listDisplay } from './functionality.js';
import { format, addWeeks, isBefore, parseISO, parse, today } from './functionality.js';
import toDoObj from './functionality.js'
import toDolist from './functionality.js'

import { createButton, createDiv, createLabel } from './factoryFunctions.js';





const onLoad = () => {
  document.addEventListener("DOMContentLoaded", () => {
    let toDoList = JSON.parse(localStorage.getItem("todoList"));
    if (toDoList) {
      toDoList = JSON.parse(localStorage.getItem("todoList"));
      let toDoObject = toDoList[0];
      Object.keys(toDoObject).forEach((key, index) => {
        if (key != "To Do") {
          const innerSidebar = document.querySelector(".inner-sidebar");
          const categoryButton = createButton({ textContent: key, classNames: ["sidebar-btn", "category", "sidebar-cat-btn"] });
          const delButton = createButton({ textContent: "x", classNames: ["del-category-btn"] });
          const categoryDiv = createDiv({ classNames: ["category-div"], children: [categoryButton, delButton] });
          innerSidebar.appendChild(categoryDiv);
        }
        displayList();
      });
    } else toDoList = [];
  });
}

const buttonClicks = () => {
  document.addEventListener("click", (e) => {

    const categoryForm = document.querySelector("#category-form");
    const addItemBtn = document.querySelector(".add-item-btn");
    const inputElement = categoryForm.elements["input-category"]
    const newCategory = inputElement.value;

    if (e.target === addItemBtn) {
      listDisplay.classList.add("hidden");
      addItemBtn.classList.add("hidden");
      form.classList.remove("hidden");
    }
    if (e.target.className.includes("form-submit-btn")) {
      const toDoText = document.querySelector("input[name='todoitem']");
      const dueDateText = document.querySelector("input[name='duedate']");
      console.log(toDoText.value);
      console.log(dueDateText.value);
      if (!toDoText.value || !dueDateText.value) {
        alert("Please fill in both the text input and date input.")
      } else {
        form.classList.add("hidden")
        listDisplay.classList.remove("hidden")
        addItemBtn.classList.remove("hidden");
        addItem();
        displayList();
      }
    }

    if (e.target.className.includes("add-new-category")) {
      document.querySelector(".input-category").classList.remove("hidden");
      document.querySelector(".add-category-btn").classList.remove("hidden");
    }
    if (e.target.className.includes("add-category-btn")) {

      document.querySelector(".category-header").textContent = newCategory;


      const newCategoryButton = createButton({ classNames: ["sidebar-btn", "category", "sidebar-cat-btn"], textContent: newCategory });
      const deleteCategoryButton = createButton({ classNames: ["del-category-btn"], textContent: "X" })
      const categoryButtonsDiv = createDiv({ classNames: ["category-div"], children: [newCategoryButton, deleteCategoryButton] });
      categoryButtonsDiv.classList.add("category-div");

      const addCategoryButton = document.querySelector(".add-new-category");
      categoryForm.insertBefore(categoryButtonsDiv, addCategoryButton);
      inputElement.value = "";
      document.querySelector(".input-category").classList.add("hidden");
      document.querySelector(".add-category-btn").classList.add("hidden");

      displayList();
    }

    if (e.target.className.includes("sidebar-cat-btn")) {
      let theCategory = e.target.textContent;
      document.querySelector(".category-header").textContent = theCategory;
      displayList();
    };

    if (e.target.className.includes("completed-btn")) {
      let itemToRemove = e.target.parentNode.querySelector(".listItem").textContent;
      let toDoList = JSON.parse(localStorage.getItem("todoList"));
      let toDoObject = toDoList[0];
      category = document.querySelector(".category-header").textContent;
      delete toDoObject[category][itemToRemove];
      toDoList = [];
      toDoList.push(toDoObject);
      localStorage.removeItem("todoList");
      localStorage.setItem("todoList", JSON.stringify(toDoList));
      e.target.parentNode.remove();
    };

    if (e.target.className.includes("del-category-btn")) {
      let parent = e.target.parentNode;
      let itemToRemove = parent.querySelector(".sidebar-cat-btn").textContent;
      let toDoList = JSON.parse(localStorage.getItem("todoList"));
      let toDoObject = toDoList[0];
      delete toDoObject[itemToRemove];
      toDoList = [];
      toDoList.push(toDoObject);
      localStorage.removeItem("todoList");
      localStorage.setItem("todoList", JSON.stringify(toDoList));
      e.target.parentNode.remove();
      document.querySelector(".category-header").textContent = "To Do";
      displayList();
    };

    if (e.target.className.includes("today")) {
      toDoList = JSON.parse(localStorage.getItem("todoList"));
      toDoObject = toDoList[0];

      for (let key in toDoObject) {
        const nestedKeys = Object.keys(toDoObject[key]);
        console.log(nestedKeys);
        for (let i = 0; i < nestedKeys.length; i++) {
          if (toDoObject[key][nestedKeys[i]] === today) {

            const todaysItem = nestedKeys[i];
            const todayLabel = createLabel({ textContent: todaysItem, classNames: ["listItem"] });
            const todayDiv = createDiv({ classNames: ["listDisplayDiv"], children: [todayLabel] });
            listDisplay.appendChild(todayDiv);
          }
        }
      }
    }

    if (e.target.className.includes("week")) {
      toDoList = JSON.parse(localStorage.getItem("todoList"));
      toDoObject = toDoList[0];

      const currentDate = new Date();
      let nextWeek = addWeeks(currentDate, 1);

      for (let key in toDoObject) {
        const nestedKeys = Object.keys(toDoObject[key])
        for (let i = 0; i < nestedKeys.length; i++) {
          const dateString = (toDoObject[key][nestedKeys[i]]);
          const taskDate = parse(dateString, 'dd.MM.yyyy', new Date());
          if (isBefore(taskDate, nextWeek)) {
            const weekItem = nestedKeys[i];
            const weekDate = toDoObject[key][weekItem];
            const weekLabel = createLabel({ classNames: ["listItem"], textContent: weekItem });
            const weekDiv = createDiv({ classNames: ["listDisplayDiv"], children: [weekLabel] });
            listDisplay.appendChild(weekDiv);
          }
        }
      }
    }
  });
}

export { onLoad, buttonClicks };