let rootcontulEl = document.getElementById("ul-cont");
let inputEl = document.getElementById("inputvalue");
let alertEl = document.getElementById("alert");

let parseTodoArr=[];
// console.log(parseTodoArr);
function onGetTodoFromlocalstroage() {
  let todoArr = localStorage.getItem("myTodoArr");
  if (todoArr === null) {
    return [];
  } else {
    parseTodoArr = JSON.parse(todoArr);
    console.log(parseTodoArr);
    return parseTodoArr;
  }
}

let TodoList = onGetTodoFromlocalstroage();

function onTodostatuschange(titleId, checkboxId) {
  let myTitle = document.getElementById(titleId);
  let myCheckbox = document.getElementById(checkboxId);
  if (myCheckbox.checked === true) {
    myTitle.style.textDecoration = "line-through";
  } else {
    myTitle.style.textDecoration = "none";
  }

let newTodoId=titleId.slice(5);
for(each of parseTodoArr){
if(each.id==newTodoId){
  if(each.isChecked===false){
   each.isChecked=true;
  }

  else{
    each.isChecked=false;
  }
}
}
}

function onDeletetodo(todoId) {
  let mydeletetodo = document.getElementById(todoId);
  rootcontulEl.removeChild(mydeletetodo);

  let newId=todoId.slice(4);
  let count=0;
for(each of TodoList){
  count=count+1;
  if(each.id==newId){
    count=count;
   parseTodoArr.splice(count-1,1);
  }
}
  }


function createandappendtodo(todo) {
  let checkboxId = "checkbox" + todo.id;
  let todoId = "todo" + todo.id;
  let titleId = "title" + todo.id;

  let listItem = document.createElement("li");
  listItem.classList.add("todo-list-item");
  listItem.id = todoId;
  rootcontulEl.appendChild(listItem);

  let checkBoxEl = document.createElement("input");
  checkBoxEl.type = "checkbox";
  checkBoxEl.id = checkboxId;
  if(todo.isChecked===true){
    checkBoxEl.checked=true;
  }
  checkBoxEl.onclick = function () {
    onTodostatuschange(titleId, checkboxId);
  };
  listItem.appendChild(checkBoxEl);

  let labelEl = document.createElement("label");
  labelEl.htmlFor = checkboxId;
  labelEl.classList.add("label-cont");
  listItem.appendChild(labelEl);
  let titleEL = document.createElement("h4");
  titleEL.classList.add("title-cont");
  titleEL.textContent = todo.title;
  titleEL.id = titleId;
  if(todo.isChecked===true){
    titleEL.style.textDecoration="line-through";
  }
  labelEl.appendChild(titleEL);

  let deletBtn = document.createElement("button");
  deletBtn.classList.add("dlt-btn");
  deletBtn.onclick = function () {
    onDeletetodo(todoId,todo);
  };
  labelEl.appendChild(deletBtn);

  let trashEL = document.createElement("i");
  trashEL.classList.add("fa-solid", "fa-trash");
  deletBtn.appendChild(trashEL);
}
for (each of TodoList) {
  createandappendtodo(each);
}

function onaddnewTodo() {

  if (inputEl.value === "") {
    alertEl.textContent = "pleasde provide valid input";
  } else {
  
    let inputElval = inputEl.value;
    let newTodo = {
      title: inputElval,
      id:TodoList.length+1,
      isChecked: false,
    };
  for(each of parseTodoArr){
    
    console.log((each.id));
    console.log((newTodo.id));
    if(newTodo.id===each.id){
      newTodo.id=newTodo.id+1;
      console.log(parseTodoArr);
    }
  }
    createandappendtodo(newTodo);
    TodoList.push(newTodo);
    inputEl.value = "";
    alertEl.textContent = "";
   
  }
}

function onSavetodo() {
  let stringTodoArr = JSON.stringify(TodoList);
  localStorage.setItem("myTodoArr", stringTodoArr);
  console.log(parseTodoArr);
}



// let my=[1,2];
// console.log(my.splice(1,1));
// console.log(my);