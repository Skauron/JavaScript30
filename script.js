const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
const items = JSON.parse(localStorage.getItem("items")) || [];
const buttonsList = document.querySelectorAll(".button");

function addItem(e) {
  e.preventDefault();
  const text = this.querySelector("[name=item]").value;
  const item = {
    text,
    donce: false,
  };
  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem("items", JSON.stringify(items));
  this.reset();
}

function populateList(plates = [], platesList) {
  platesList.innerHTML = plates
    .map((plate, i) => {
      return `
      <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${
        plate.done ? "checked" : ""
      }/>
        <label for="item${i}">${plate.text}</label>
      </li>
    `;
    })
    .join("");
}

function toggleDone(e) {
  if (!e.target.matches("input")) return; //Skip this unless it's an input
  items[e.target.dataset.index].done = !items[e.target.dataset.index].done;
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
}

function buttonFunction(e) {
  switch (e.target.name) {
    case "Clear":
      items.splice(0, items.length);
      break;
    case "Uncheck":
      items.map((plate) => plate.done = false);
      break;
    case "Check":
      items.map((plate) => plate.done = true);
      break;
  }
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
}

addItems.addEventListener("submit", addItem);
itemsList.addEventListener("click", toggleDone);
buttonsList.forEach((button) => {
  button.addEventListener("click", buttonFunction);
});
populateList(items, itemsList);
