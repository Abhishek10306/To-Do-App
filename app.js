const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todolist");

let editTodo = null;

//function is to add todo
const addTodo = () => {
  const inputText = inputBox.value.trim();
  if (inputText.length <= 0) {
    alert("Write Something");
    return false;
  }

  else if (addBtn.value === "Edit") {
    // if edit button is clicked
    editTodo.target.previousElementSibling.innerHTML = inputText;
    editLocalTodo(inputText);
    inputBox.value = "";
    addBtn.value = "Add";
    editTodo = null;
  }

  else {

    // creating p tag
    const li = document.createElement("li");
    const p = document.createElement("p");

    p.innerHTML = inputText;
    li.appendChild(p);

    const editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit";
    editBtn.classList.add("btn", "edit");
    li.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Remove";
    deleteBtn.classList.add("btn", "delete");
    li.appendChild(deleteBtn);



    todoList.appendChild(li);
    inputBox.value = "";

    saveLocalTodo(inputText);

  }
}

//function is to update(edit/ Delete) todo
const updateTodo = (e) => {

  // console.log(e.target.innerHTML);

  if (e.target.innerHTML === "Remove") {
    todoList.removeChild(e.target.parentElement);
    deleteLocalTodo(e.target.parentElement);
  }
  else if (e.target.innerHTML === "Edit") {
    inputBox.value = e.target.previousElementSibling.innerHTML;
    inputBox.focus();
    addBtn.value = "Edit";
    editTodo = e;

  }
}

// function is to save todo in local storage
const saveLocalTodo = (todo) => {
  let todos; // key
  if (localStorage.getItem("todos") === null) {
    todos = [];
  }

  else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// function is to get todo from local storage
const getLocalTodo = () => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  }

  else {
    todos = JSON.parse(localStorage.getItem("todos"));
    todos.forEach(todo => {
      // creating p tag
      const li = document.createElement("li");
      const p = document.createElement("p");

      p.innerHTML = todo;
      li.appendChild(p);

      const editBtn = document.createElement("button");
      editBtn.innerHTML = "Edit";
      editBtn.classList.add("btn", "edit");
      li.appendChild(editBtn);

      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = "Remove";
      deleteBtn.classList.add("btn", "delete");
      li.appendChild(deleteBtn);



      todoList.appendChild(li);
    });
  }

  return todos;
}

// function is to delete todo from local storage
const deleteLocalTodo = (todo) => {

  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  let todoText = todo.children[0].innerHTML;
  // console.log(todoText.children[0].innerHTML);

  let todoIndex = todos.indexOf(todoText);
  // console.log(todoIndex);

  // slice - copy create not orignal 
  // splice - orignal array is modified

  todos.splice(todoIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

const editLocalTodo = (todo) => {
  let todos = JSON.parse(localStorage.getItem("todos"));
  let todoIndex = todos.indexOf(todo);

  todos[todoIndex] = inputBox.value.trim();
  localStorage.setItem("todos", JSON.stringify(todos));

}


document.addEventListener('DOMContentLoaded', getLocalTodo);
addBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", updateTodo);

