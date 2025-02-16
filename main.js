// Select elements
const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const toDoListContainer = document.getElementById('task-list');

// Load tasks from localStorage or set an empty array
let toDoListItems = JSON.parse(localStorage.getItem('tasks')) || [];
// Function to display items
function displayItems() {
    toDoListContainer.innerHTML = ""; // Clear existing list
    toDoListItems.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${task} 
            <button class="delete-btn" data-index="${index}">❌</button>
        `;
        toDoListContainer.appendChild(li);
    });

    // Attach delete event listeners
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', deleteTask);
    });

    // Save updated tasks to localStorage
    localStorage.setItem('tasks', JSON.stringify(toDoListItems));
}

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return; // Prevent empty tasks

    toDoListItems.push(taskText); // Add new task to array
    displayItems();  // Re-render list
    taskInput.value = ""; // Clear input field
}

// Function to delete a task
function deleteTask(event) {
    const index = event.target.dataset.index; // Get task index
    toDoListItems.splice(index, 1); // Remove task from array
    displayItems(); // Re-render list
}

// Event listener for adding tasks
addTaskButton.addEventListener('click', addTask);
// Load stored tasks on page load
displayItems();
