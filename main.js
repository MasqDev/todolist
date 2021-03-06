// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();


function loadEventListeners() {

  
  form.addEventListener('submit', addTask);
  
  taskList.addEventListener('click', removeTask);
  
  clearBtn.addEventListener('click', clearTasks);

    filter.addEventListener('keyup', filterTasks);

    document.addEventListener('DOMContentLoaded', getTasks);



}

// Add Task
function addTask(e) {
  if(taskInput.value === '') {
    alert('Add a task');
  }

  const li = document.createElement('li');
  
  li.className = 'collection-item';

  li.appendChild(document.createTextNode(taskInput.value));

  const link = document.createElement('a');
  
  link.className = 'delete-item';

  link.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';

  li.appendChild(link);

  taskList.appendChild(li);

//Clear input
  taskInput.value = '';

  //Store to LS
      storeTaskInLocalStorage(taskInput.value);

  e.preventDefault();
}
//Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks')===null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks) ); 
  
}


//Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
    }
  }
}


//Clear Tasks
function clearTasks() {
  taskList.innerHTML='';
}

//Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}


