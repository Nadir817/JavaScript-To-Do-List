const clear = document.querySelector(".clear");
const date = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const addBtn = document.querySelector(".add-btn");

const UNCHECK = "fa-circle-thin";
const CHECK = "fa-check-circle";
const LINE_THROUGH = "lineThrough";

let LIST;
let id;

let data = localStorage.getItem("TODO");

if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  loadList(LIST);
} else {
  LIST = [];
  id = 0;
}

function loadList(arr) {
  arr.forEach(item => {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}

const today = new Date();
const options = { weekday: "long", month: "short", day: "numeric" };
date.innerHTML = today.toLocaleDateString("en-US", options);

function addToDo(todo, id, done, trash) {
  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";
  if (trash) {
    return;
  }
  const text = `
      <li class="item">
        <i class="fa ${DONE} co" job="complete" id='${id}'></i>
        <p class="text ${LINE}">${todo}</p>
        <i class="fa fa-trash-o de" job="delete" id='${id}'></i>
      </li>
    `;

  const position = "beforeend";

  list.insertAdjacentHTML(position, text);
}

function completeToDo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;
}

function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].trash = true;
}

function handler() {
  const toDo = input.value;
  if (toDo) {
    addToDo(toDo, id, false, false);
    LIST.push({
      name: toDo,
      id: id,
      done: false,
      trash: false
    });
  }
  localStorage.setItem("TODO", JSON.stringify(LIST));
  id++;
  input.value = "";
}

document.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    handler();
  }
});

addBtn.addEventListener("click", function(event) {
  handler();
});

list.addEventListener("click", function(event) {
  let element = event.target;
  const elementJob = event.target.attributes.job.value;

  if (elementJob === "complete") {
    completeToDo(element);
  } else if (elementJob === "delete") {
    removeToDo(element);
  }
  localStorage.setItem("TODO", JSON.stringify(LIST));
});

clear.addEventListener("click", function() {
  localStorage.clear();
  location.reload();
});
