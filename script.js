// Get the value entered by the user
const userTaskValue = document.querySelector('.userTaskValue');
// Button to add new task
const addNewTaskBtn = document.querySelector('.addNewTaskBtn');
// Get every Task enter by the user
const listTasks = document.querySelector('.listTasks');
// Button to delete every task once clicked on
const clearAllBtn = document.querySelector('.clearAll');
// Create a div tag and will contain all the tasks of the user
const container = document.createElement('div');
// Variable that will be useful for the local Storage
let toDoList;

/**
 * @param task 
 * 
 * This function allows us to create and display a new task on the web page
*/
function display(task) {
    container.innerHTML += 
        `<div class="task">
            <span class="taskValue">${task}</span> 
            <div class="deleteCheckBtn">
                <button class="checkBtn"><i class="material-icons done">done</i></button>
                <button class="deleteBtn"><i class="material-icons delete">delete</i></button>
            </div>
        </div>`;
}

/**
 * This function Allows us to add and display the task entered by the user
*/
function addTask() {
    // We are just saying that if the user enter nothing, the list array doesn't expand
        if (userTaskValue.value === "") {
            return;
        }
        else {
            listTasks.appendChild(container);
        }
    // Display the task enter by the user on the webpage once clicking on the add Button
        display(userTaskValue.value);
    // Add userTask in local Storage
        saveLocalStorage(userTaskValue.value);
    // Delete value of the textarea after the user finished to add a new task
        userTaskValue.value = "";
}

/**
 * @param targetCheckBtn 
 * 
 * This function apply a class to the clicked checked button (meaning the task has been completed)
*/
function taskChecked(targetCheckBtn) {
    if (targetCheckBtn.target.className === 'checkBtn') {
        targetCheckBtn.target.children[0].classList.toggle('completedTask');
    }
}

/**
 * @param targetDeleteBtn 
 * 
 * This function delete the targeted task as well as in the web page as in the local Storage
*/
function taskDeleted(targetDeleteBtn) {
    if (targetDeleteBtn.target.className === 'deleteBtn') {
        targetDeleteBtn.target.parentElement.parentElement.remove();
        removeLocalStorageTodo(targetDeleteBtn.target.parentElement.parentElement);
    }
}

/**
 * This function will create an 'array' (as a string : something like '[el1, el2, ...]') in the local Storage and will transform this string array into a real object (here an array)
*/
function createArray() {
    if (localStorage.getItem('toDoList') === null) {
        toDoList = [];
    }
    else {
        toDoList = JSON.parse(localStorage.getItem('toDoList'));
    }
}

/**
 * @param newTask 
 * 
 * This function save the task entered by the user in the local storage by creating an array
*/
function saveLocalStorage(newTask) {
    createArray();
    toDoList.push(newTask);
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
}

/**
 * Once the page is, for instance, refreshed or re-opened, then we get everything we saved in the local Storage, and it can be display on the web page as we leaved it
*/
function getToDoList() {
    createArray();
    toDoList.forEach(function(displayNewTask) {
        if (displayNewTask === "") {
            return;
        }
        else {
            listTasks.appendChild(container);
        }
        display(displayNewTask);
    });
}

/**
 * @param deleteTargetTask 
 * 
 * This function allows us to remove the task in the local Storage that has been deleted in the web page
*/
function removeLocalStorageTodo(deleteTargetTask) {
    createArray();
    toDoList.splice(toDoList.indexOf(deleteTargetTask.children[0].innerText), 1);
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
}

/**
 * The following function allows us to delete every tasks as well as in the loxalStorage as in in the web page
*/
function clearAll() {
    localStorage.clear();
    container.innerHTML = "";
    userTaskValue.value = "";
}

document.addEventListener('DOMContentLoaded', getToDoList);
addNewTaskBtn.addEventListener('click', addTask);
listTasks.addEventListener('click', taskChecked);
listTasks.addEventListener('click', taskDeleted);
clearAllBtn.addEventListener('click', clearAll);