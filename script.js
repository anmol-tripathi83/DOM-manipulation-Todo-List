function loadTodos(){
    //This function will load the todos from the browsers
    const todos = JSON.parse(localStorage.getItem("todos")) || {"todoList":[]}; 
    console.log(todos);
    return todos;
}

function refreshTodos(todos){
    localStorage.setItem("todos",JSON.stringify(todos));
}

function addTodoToLocalstorage(todo){
    //This function will add the todo to the local storage
    const todos = loadTodos();
    todos.todoList.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function executeFilterAction(event){
    const taskList = document.getElementById("taskList");
    const element = event.target;
    const value = element.getAttribute("data-filter");   // accessing attribute
    taskList.innerHTML = '';
    const todos = loadTodos();
    if(value == "all"){
        todos.todoList.forEach(todo =>{
            appendTodoInHtml(todo);
            });
    }
    else if(value=="pending"){
        todos.todoList.forEach(todo =>{
            if(todo.isCompleted != true)
                appendTodoInHtml(todo);
            });
    }
    else if(value == "completed"){
        todos.todoList.forEach(todo =>{
            if(todo.isCompleted === true)
                 appendTodoInHtml(todo);
            });
    }
}

function appendTodoInHtml(todo){
    //This function will append the todo to the html
    const taskList = document.getElementById("taskList");

    const taskitem = document.createElement("li");

    taskitem.setAttribute("data-id",todo.id);

    const textDiv = document.createElement("div");

    if(todo.isCompleted){
        textDiv.classList.add("completed");
    }

    textDiv.textContent = todo.text;
    taskitem.classList.add("taskitem");

    const wrapper = document.createElement("div");
    wrapper.classList.add("todoButtons");

    //Edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("editBtn");

    // Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.addEventListener("click",deletedTodo);


    //Complete Button 
    const completedBtn = document.createElement("button");
    completedBtn.textContent =(todo.isCompleted)? "Reset" : "Completed";
    completedBtn.classList.add("completeBtn");
    completedBtn.addEventListener("click",toggleTodo);

    wrapper.appendChild(editBtn);
    wrapper.appendChild(deleteBtn);
    wrapper.appendChild(completedBtn);

    taskitem.appendChild(textDiv);
    taskitem.appendChild(wrapper);

    taskList.appendChild(taskitem);
}

function resetHtmlTodos(todos){
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = '';
    todos.todoList.forEach(todo =>{
        appendTodoInHtml(todo);
    });
}

function toggleTodo(event){
    //This function will complete the todo
    const todoItem = event.target.parentElement.parentElement;
    const todoId = todoItem.getAttribute("data-id");
    const todos = loadTodos();
    todos.todoList.forEach(todo =>{
        if(todo.id == todoId){
        todo.isCompleted = !todo.isCompleted;
        }
    });
    refreshTodos(todos);
    resetHtmlTodos(todos);
}

function deletedTodo(event){
    const todoItem = event.target.parentElement.parentElement;
    const todoId = todoItem.getAttribute("data-id"); 
    console.log(todoId);
    let todos = loadTodos();
    todos.todoList = todos.todoList.filter(todo => todo.id != todoId);
    console.log(todos);
    refreshTodos(todos);
    resetHtmlTodos(todos);
}

document.addEventListener("DOMContentLoaded",()=>{

    const todoInput = document.getElementById("todoInput");

    const submitButton = document.getElementById("addTodo");

    let todos = loadTodos();

    const taskList = document.getElementById("taskList");


    const filterbtns = document.getElementsByClassName("filterBtn");
    for(btn of filterbtns){
        btn.addEventListener("click",executeFilterAction);
    };


    submitButton.addEventListener("click",(event)=>{
        const todoText = todoInput.value;
        if(todoText ==''){
            alert("Please write something for the todo");
        } else{
            // console.log(todos);
            todos = loadTodos();
            const id = todos.todoList.length;
            addTodoToLocalstorage({text: todoText, isCompleted:false, id});
            appendTodoInHtml({text: todoText, isCompleted:false, id});
            todoInput.value = '';
        }
    });

    todoInput.addEventListener("change", (event)=>{
        // This callback method is fired everytime there is a change in the input tag
        const todoText = event.target.value;      // event.target is targetting input tag same as todoInput
        event.target.value = todoText.trim();
    });

    todos.todoList.forEach(todo => {
        appendTodoInHtml(todo);
    });

});