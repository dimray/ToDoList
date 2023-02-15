import { loadForm } from "./addItem";

const content = document.querySelector("#content");


function createSidebar() {
  const sidebar = document.createElement("div");
  sidebar.classList.add("sidebar");
  let text = document.createElement("h1");
  text.textContent = "testing";
  sidebar.appendChild(text);
  return sidebar;
}


function createHeader() {
  const header = document.createElement("header");
  header.classList.add("header");

  const title = document.createElement("h1");
  title.textContent = "My To Do List";

  header.appendChild(title);
  return header;
}

function addItemButton() {
  const btnAddItem = document.createElement("button");
  btnAddItem.classList.add("addItem", "btn");
  btnAddItem.textContent = "+ Add item";
  return btnAddItem;
}

function createMain() {
  const main = document.createElement("main");
  main.classList.add("main");
  main.appendChild(addItemButton());

  return main;
}

function createFooter() {
  const footer = document.createElement("footer");
  footer.classList.add("footer");

  const copyright = document.createElement("p");
  copyright.textContent = `copyright ©${new Date().getFullYear()} dimray`;

  footer.appendChild(copyright);
  return footer;
}

function createInnerContent() {
  const innerContent = document.createElement("div");
  innerContent.classList.add("innerContent");
  innerContent.appendChild(createHeader());
  innerContent.appendChild(createMain());
  innerContent.appendChild(createFooter());
  return innerContent;
}


function listener() {
  const doc = document.querySelector("#content");
  doc.addEventListener("click", (e) => {
    if (e.target.className.includes("addItem")) {
      loadForm();
    } else if (e.target.className.includes("form-submit-btn")) {

    }
  });
}


function initializeWebsite() {
  listener();
  content.appendChild(createSidebar());
  content.appendChild(createInnerContent());
}

export { initializeWebsite };



