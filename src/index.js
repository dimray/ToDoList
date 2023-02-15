import { initializeWebsite } from "./website";

function listener() {
  const doc = document.querySelector("#content");
  doc.addEventListener("click", (e) => {

    if (e.target.className.includes("addItem")) {

      console.log(e);
      createNewItem();
    }
  });
}


initializeWebsite();






