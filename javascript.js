
const submitForm = document.querySelector('.add');
const addButton = document.querySelector('.add-todo');
const todoList = document.querySelector('.todos');
let listLength = 0;

// Retrieve tasks from local storage
function getTasksFromLocalStorage() {
  const tasks = localStorage.getItem('tasks');
  if (tasks) {
    todoList.innerHTML = tasks;
    listLength = document.querySelectorAll('.todos li').length;
  }
}

// Save tasks to local storage
function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', todoList.innerHTML);
}

const generateTemplate = (todo) => {
  listLength++;
  const html = `<li>
                  <input type="checkbox" id="todo_${listLength}" />
                  <label for="todo_${listLength}">
                      <span class="check"></span>${todo}
                  </label>
                  <i class="far fa-edit edit"></i>
                  <i class="far fa-trash-alt delete"></i>
                </li>`;
  todoList.innerHTML += html;
  
  // Save tasks to local storage
  saveTasksToLocalStorage();
};

function addTodos(e) {
  e.preventDefault();
  const todo = submitForm.add.value.trim();
  if (todo.length) {
    generateTemplate(todo);
    submitForm.reset();
  }
}

function deleteTodos(e) {
  if (e.target.classList.contains('delete')) {
    e.target.parentElement.remove();
    
    // Save tasks to local storage
    saveTasksToLocalStorage();
  }
}

function editTodo(e) {
  if (e.target.classList.contains('edit')) {
    const listItem = e.target.parentElement;
    const label = listItem.querySelector('label');
    const todoText = label.textContent;
    const newText = prompt('Edit the task:', todoText.trim());
    console.log(label);
    if (newText !== null && newText.trim() !== '') {
      label.innerHTML =`<span class='check'></span>${newText}`;
      // Save tasks to local storage
      saveTasksToLocalStorage();
    }
  }
}

submitForm.addEventListener('submit', addTodos);
addButton.addEventListener('click', addTodos);
todoList.addEventListener('click', deleteTodos);
todoList.addEventListener('click', editTodo);

// Call the function to retrieve tasks from local storage when the page loads
document.addEventListener('DOMContentLoaded', getTasksFromLocalStorage);

// Prevent search history from appearing in input box
submitForm.add.setAttribute('autocomplete', 'off');
