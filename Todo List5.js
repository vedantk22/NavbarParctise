let rootcontforTodoEl=document.getElementById("rootcontforTodo");
let inputbyuserEl=document.getElementById("inputbyuser");
let alertEl=document.getElementById("alert");
function onGetDataFromLocalStroage(){
    let newMyArr=localStorage.getItem("myArrTodolist");
    if(newMyArr===null){
        return [];
    }
    else{
        let pasredNewMyArr=JSON.parse(newMyArr);
        return pasredNewMyArr;
    }
}

let todoList=onGetDataFromLocalStroage();

function onChangeStatusTodo( titleId,checkboxId){
   let mytitleId=document.getElementById(titleId);
   let mycheckboxId=document.getElementById(checkboxId);
   if(mycheckboxId.checked===true){
    mytitleId.style.textDecoration="line-through";
   }
   else{
    mytitleId.style.textDecoration="none";
   }
   let newtitleId=titleId.slice(5);
   for(each of todoList){
    if(each.id==newtitleId){
        if(each.isChecked===false){
            each.isChecked=true;
        }
        else{
            each.isChecked=false;
        }
    }
   }
}

function onDeleteTodo(todoId){
    let mytodoId=document.getElementById(todoId);
    rootcontforTodoEl.replaceChild(mytodoId);
}

function createTodo(todo){
    let todoId="todo"+todo.id;
    let checkboxId="checkbox"+todo.id;
    let titleId="title"+todo.id;
    let listItem=document.createElement("li");
    listItem.classList.add("list-cont");
    listItem.id=todoId;
    rootcontforTodoEl.appendChild(listItem);

    let checkboxEl=document.createElement("input");
    checkboxEl.type="checkbox";
    checkboxEl.id=checkboxId;
    checkboxEl.onclick=function(){
        onChangeStatusTodo(titleId,checkboxId);
    }
    if(todo.isChecked===true){
        checkboxEl.checked="checked";
    }
    listItem.appendChild(checkboxEl);

    let labelEl=document.createElement("label");
    let titleEl=document.createElement("h4");
    titleEl.textContent=todo.title;
    titleEl.style.marginLeft="12px";
    titleEl.id=titleId;
    if(todo.isChecked===true){
        titleEl.style.textDecoration="line-through";
    }
    labelEl.appendChild(titleEl);
    labelEl.htmlFor=checkboxId;
    labelEl.classList.add("label-cont");
    listItem.appendChild(labelEl);

    let deleteBtn=document.createElement("button");
    deleteBtn.classList.add("dlt-btn");
    deleteBtn.onclick=function(){
        onDeleteTodo(todoId);
    }
    labelEl.appendChild(deleteBtn);

    let delteIcon=document.createElement("i");
    delteIcon.classList.add("fa-solid","fa-trash");
    deleteBtn.appendChild(delteIcon);
} 


for(each of todoList){
    createTodo(each);
}

function onaddNewTodo(){
    let inputVal=inputbyuserEl.value;
    if(inputVal===""){
        alertEl.textContent="please provide valid input";
    }
    else{
       
        let newTodo={
            title:inputbyuserEl.value,
            id:todoList.length+1,
            isChecked:false
        }
        createTodo(newTodo);
        todoList.push(newTodo);
        alertEl.textContent="";
        inputbyuserEl.value="";
    }
}

function onSaveTodo(){
    let stringArr=JSON.stringify(todoList);
    localStorage.setItem("myArrTodolist",stringArr);
}