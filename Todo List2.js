let rootContTodoEl = document.getElementById("rootContTodo");
let inputValEl = document.getElementById("inputVal");
let alertEl = document.getElementById("alert");




function onGetTodoFromLocalStorage() {
  let todoArr = localStorage.getItem("myTodoArr");
  if (todoArr === null) {
    return [];
  } else {
    let pasreTodo = JSON.parse(todoArr);
    return pasreTodo;
  }
}



let todoList = onGetTodoFromLocalStorage();



function onchangeStatustodo(titleId, checkboxId) {
  let mytitleId = document.getElementById(titleId);
  let mycheckboxId = document.getElementById(checkboxId);
  if (mycheckboxId.checked === true) {
    mytitleId.style.textDecoration = "line-through";
  } else {
    mytitleId.style.textDecoration = "none";
  }

  let newtodoId = titleId.slice(5);
  for (let each of todoList) {
    if (each.id == newtodoId) {
      if (each.isChecked === false) {
        each.isChecked = true;
      } else {
        each.isChecked = false;
      }
    }
  }
}



function onDeletetodo(todoId) {
  let newtodoId = document.getElementById(todoId);
  rootContTodoEl.removeChild(newtodoId);
}



function oncreatetodo(todo) {
  let titleId = "title" + todo.id;
  let checkboxId = "checkbox" + todo.id;
  let todoId = "todo" + todo.id;
  // created a list tag for items to show
  let listItem = document.createElement("li");
  listItem.classList.add("list-cont-todo");
  listItem.id = todoId;
  rootContTodoEl.appendChild(listItem);

  let checkboxEl = document.createElement("input");
  checkboxEl.type = "checkbox";
  checkboxEl.id = checkboxId;

  if (todo.isChecked === true) {
    checkboxEl.checked = true;
  }
  checkboxEl.onclick = function () {
    onchangeStatustodo(titleId, checkboxId);
  };
  listItem.appendChild(checkboxEl);

  // create a label element
  let labelEl = document.createElement("label");
  labelEl.classList.add("label-cont");
  labelEl.htmlFor = checkboxId;
  let textContentEl = document.createElement("h4"); //adding heading for text content.
  textContentEl.style.marginLeft = "20px";
  textContentEl.id = titleId;
  if (todo.isChecked === true) {
    titleEL.style.textDecoration = "line-through";
  }
  labelEl.appendChild(textContentEl);
  textContentEl.textContent = todo.title;
  listItem.appendChild(labelEl);
  // creating button for performing delete oprations.
  let btnEl = document.createElement("button");
  btnEl.classList.add("deletebtn");
  btnEl.onclick = function () {
    onDeletetodo(todoId);
  };
  labelEl.appendChild(btnEl);

  // delete icon loaded into btn element.
  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa-solid", "fa-trash");
  btnEl.appendChild(deleteIcon);
}



for (each of todoList) {
  oncreatetodo(each);
}



function onaddnewtodo() {
  let userIn = inputValEl.value;
  if (userIn === "") {
    alertEl.textContent = "please provide valid input";
  } else {
    let userInputVal = inputValEl.value;
    let newTodo = {
      title: userInputVal,
      id: todoList.length + 1,
      isChecked: false,
    };
    oncreatetodo(newTodo);
    todoList.push(newTodo);
    alertEl.textContent = "";
    inputValEl.value = "";
  }
}




function onSavetodo() {
  let stringTodo = JSON.stringify(todoList);
  localStorage.setItem("myTodoArr", stringTodo);
}
