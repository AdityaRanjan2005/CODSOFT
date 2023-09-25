document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    
    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                ${task}
                <button class="deleteTaskBtn" data-index="${index}"><i class="bx bx-trash"></i></button>
            `;
            taskList.appendChild(listItem);
        });
    }

    
    function addNewTask() {
        const newTask = taskInput.value.trim();
        if (newTask !== "") {
            tasks.push(newTask);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            taskInput.value = "";
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
        if (e.target.closest(".deleteTaskBtn")) {
            const index = e.target.closest(".deleteTaskBtn").getAttribute("data-index");
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        }
    });

    
    renderTasks();
});
