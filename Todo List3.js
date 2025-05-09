let ulRootContEl = document.getElementById("ul-cont");
let inputtagEl = document.getElementById("inputtag");
let alertEl = document.getElementById("alert");

function onGetTodoFromLocalStorage() {
  let mynewTodoArr = localStorage.getItem("myTodoArr");
  if (mynewTodoArr === null) {
    return [];
  } else {
    let newparseTodoArr = JSON.parse(mynewTodoArr);
    return newparseTodoArr;
  }
}

let todoList = onGetTodoFromLocalStorage();

function onDeleteTodo(titleId) {
  let mytitleId = document.getElementById(titleId);
  ulRootContEl.removeChild(mytitleId);
}

function onChangeStatusTodo(crossId, checkboxId) {
  let mycrossId = document.getElementById(crossId);
  let mycheckboxId = document.getElementById(checkboxId);
  if (mycheckboxId.checked === true) {
    mycrossId.style.textDecoration = "line-through";
  } else {
    mycrossId.style.textDecoration = "none";
  }
  let newCheckBoxId = checkboxId.slice(8);
  for (each of todoList) {
    if (each.id == newCheckBoxId) {
      if (each.isChecked === true) {
        each.isChecked = false;
      } else {
        each.isChecked = true;
      }
    }
  }
}

function createonappendTodo(todo) {
  let checkboxId = "checkbox" + todo.id;
  let titleId = "title" + todo.id;
  let crossId = "cross" + todo.id;
  let listItemEl = document.createElement("li");
  listItemEl.classList.add("list-item-cont");
  listItemEl.id = titleId;
  ulRootContEl.appendChild(listItemEl);

  let checkboxEl = document.createElement("input");
  checkboxEl.type = "checkbox";
  checkboxEl.id = checkboxId;
  checkboxEl.onclick = function () {
    onChangeStatusTodo(crossId, checkboxId);
  };
  checkboxEl.classList.add("checkbox");

  if (todo.isChecked === true) {
    checkboxEl.checked = true;
  }
  listItemEl.appendChild(checkboxEl);

  let labelEl = document.createElement("label");
  labelEl.classList.add("label-cont");
  let headingEl = document.createElement("h4");
  headingEl.style.marginLeft = "15px";
  headingEl.id = crossId;
  headingEl.textContent = todo.title;

  if (todo.isChecked === true) {
    headingEl.style.textDecoration = "line-through";
  }
  labelEl.appendChild(headingEl);
  labelEl.htmlFor = checkboxId;
  listItemEl.appendChild(labelEl);

  let deleteBtn = document.createElement("button");
  deleteBtn.classList.add("dlt-btn");
  deleteBtn.onclick = function () {
    onDeleteTodo(titleId);
  };
  labelEl.appendChild(deleteBtn);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa-solid", "fa-trash");
  deleteBtn.appendChild(deleteIcon);
}
for (each of todoList) {
  createonappendTodo(each);
}

function onaddnewTodo() {
  let inputVal = inputtagEl.value;
  if (inputVal === "") {
    alertEl.textContent = "please provide valid input";
  } else {
    let newTodo = {
      title: inputVal,
      id: todoList.length + 1,
      isChecked: false,
    };
    createonappendTodo(newTodo);
    todoList.push(newTodo);
    alertEl.textContent = "";
    inputtagEl.value = "";
  }
}
function onSaveTodo() {
  let stringTodo = JSON.stringify(todoList);
  localStorage.setItem("myTodoArr", stringTodo);
}
