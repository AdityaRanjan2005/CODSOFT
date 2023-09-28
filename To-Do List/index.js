document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const deadlineInput = document.getElementById("deadlineInput"); 

    
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    
    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <span>${task.text}</span>
                <span>${task.deadline}</span>
                <button class="editTaskBtn" data-index="${index}"><i class="bx bx-edit"></i></button>
                <button class="deleteTaskBtn" data-index="${index}"><i class="bx bx-trash"></i></button>
            `;
            taskList.appendChild(listItem);
        });
    }

    
    function addNewTask() {
        const newTaskText = taskInput.value.trim();
        const newTaskDeadline = deadlineInput.value; 
        const currentDate = new Date(); 
        const formattedDate = currentDate.toLocaleDateString();

        if (newTaskText !== "") {
            const newTask = {
                text: newTaskText,
                deadline: newTaskDeadline,
                addedOn: formattedDate,
            };
            tasks.push(newTask);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            taskInput.value = "";
            deadlineInput.value = ""; 
            renderTasks();
        }
    }

    
    taskInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            addNewTask();
        }
    });

    
    addTaskBtn.addEventListener("click", addNewTask);

    
    taskList.addEventListener("click", function (e) {
        if (e.target.classList.contains("editTaskBtn")) {
            const index = e.target.getAttribute("data-index");
            const updatedText = prompt("Edit task:", tasks[index].text);
            if (updatedText !== null) {
                tasks[index].text = updatedText;
                localStorage.setItem("tasks", JSON.stringify(tasks));
                renderTasks();
            }
        }
    });

    
    taskList.addEventListener("click", function (e) {
        if (e.target.classList.contains("deleteTaskBtn")) {
            const index = e.target.getAttribute("data-index");
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        }
    });

    
    renderTasks();
});
