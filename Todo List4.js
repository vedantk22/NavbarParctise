let rootcontforTodoEl = document.getElementById("rootcontforTodo");
let inputbyuserEl = document.getElementById("inputbyuser");
let alertEl = document.getElementById("alert");
// function to get data fromn local stroage
function onGetDataFromLocalStroage() {
  let newArrofTodo = localStorage.getItem("ArrofTodo");
  if (newArrofTodo === null) {
    return [];
  } else {
    let pasrednewArrofTodo = JSON.parse(newArrofTodo);
    return pasrednewArrofTodo;
  }
}
// todolist call from local strosage
let todoList = onGetDataFromLocalStroage();

// delete function
function onDeleteTodo(todoId) {
  let mynewTodo = document.getElementById(todoId);
  rootcontforTodoEl.removeChild(mynewTodo);
}
function onChangeStatusTodo(checkboxId,titleId){
    let mycheckboxId=document.getElementById(checkboxId);
    let mytitleId=document.getElementById(titleId);
    if(mycheckboxId.checked===true){
mytitleId.style.textDecoration="line-through";
    }
    else{
        mytitleId.style.textDecoration="none";

    }
    let newTitleId=titleId.slice(5);
   for(each of todoList){
    if(each.id==newTitleId){
   if(each.isChecked===false){
    each.isChecked=true;
   }
   else{
    each.isChecked=false;
   }
    }
   }
}


// function for creating  todo
function oncreatenewTodo(todo) {
  let todoId = "todo" + todo.id;
  let checkboxId = "checkobox" + todo.id;
  let titleId="title"+todo.id;
  let listItem = document.createElement("li");
  listItem.classList.add("listitem-cont");
  listItem.id = todoId;
  rootcontforTodoEl.appendChild(listItem);

  let checkboxEl = document.createElement("input");
  checkboxEl.type = "checkbox";
  checkboxEl.id = checkboxId;
  checkboxEl.onclick=function(){
    onChangeStatusTodo(checkboxId,titleId);
  }
  if(todo.isChecked===true){
   checkboxEl.checked=true;
  }
  listItem.appendChild(checkboxEl);

  let labelEl = document.createElement("label");
  let titleEl = document.createElement("h4");
  titleEl.textContent = todo.title;
  titleEl.id=titleId;
  
  if(todo.isChecked===true){
    titleEl.style.textDecoration="line-through";
   }
  titleEl.style.marginLeft = "13px";
  labelEl.appendChild(titleEl);
  labelEl.classList.add("label-cont");
  labelEl.htmlFor = checkboxId;
  listItem.appendChild(labelEl);

  let deleteBtn = document.createElement("button");
  deleteBtn.classList.add("dlt-btn");
  deleteBtn.onclick = function () {
    onDeleteTodo(todoId);
  };
  labelEl.appendChild(deleteBtn);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa-solid", "fa-trash");
  deleteBtn.appendChild(deleteIcon);
}

for (each of todoList) {
  oncreatenewTodo(each);
}
// function to add new todo
function onaddnewTodo() {
  let inputVal = inputbyuserEl.value;
  if (inputVal === "") {
    alertEl.textContent = "please provide valid input ";
  } else {
    let newTodo = {
      title: inputbyuserEl.value,
      id: todoList.length + 1,
      isChecked: false,
    };
    oncreatenewTodo(newTodo);
    todoList.push(newTodo);
    alertEl.textContent = "";
    inputbyuserEl.value = "";
  }
}
// function to save in local stroage
function onSaveTodo() {
  let stringTodo = JSON.stringify(todoList);
  localStorage.setItem("ArrofTodo", stringTodo);
}
