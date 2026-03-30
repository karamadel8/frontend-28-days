const addBtn = document.getElementById("add-btn");
const todoInput = document.getElementById("todo-input");
const tasks = document.getElementById("todo-list");
const filteredBtns = document.querySelectorAll(".btn");
const clearDone = document.getElementById("clear-completed");
const taskNo = document.getElementById("task-count");
const taskLeft = document.getElementById("task-left");
let taskCount = 0;
function savetask() {
  const savedtasks = [];
  const allTasks = document.querySelectorAll(".todo-item");
  allTasks.forEach((task) => {
    savedtasks.push({
      id: task.dataset.id,
      text: task.querySelector(".todo-text").textContent,
      done: task.classList.contains("done"),
    });
  });
  window.localStorage.setItem("tasks", JSON.stringify(savedtasks));
}
function loadtasks() {
  const saved = localStorage.getItem("tasks");
  if (saved === null) return;
  const savedarray = JSON.parse(saved);
  savedarray.forEach((task) => {
    addtask(task.text, task.done);
  });
}
loadtasks();
function updatecount() {
  taskNo.textContent = taskCount + " " + "tasks remaining";
  taskLeft.textContent = taskCount + " " + "tasks remaining";
}
function addtask(text = todoInput.value, isdone = false) {
  if (text !== "") {
    taskCount++;
    const newTask = document.createElement("li");
    const taskInput = document.createElement("span");
    const taskspan = document.createElement("span");
    const checkbtn = document.createElement("button");
    const deletebtn = document.createElement("button");
    newTask.classList.add("todo-item");
    taskInput.classList.add("todo-input");
    newTask.dataset.id = taskCount;
    checkbtn.classList.add("check-btn");
    taskspan.classList.add("todo-text");
    deletebtn.classList.add("delete-btn");
    taskspan.textContent = text;
    checkbtn.innerHTML =
      '<i class="fa-regular fa-circle cursor-pointer" id="check" ></i>';
    deletebtn.innerHTML =
      '<i class="fa-regular fa-trash-can cursor-pointer" id="delete"></i>';
    if (isdone) {
      newTask.classList.add("done");
      checkbtn.innerHTML =
        '<i class="fa-regular fa-circle-dot cursor-pointer" ></i>';
      taskCount--;
    }
    taskInput.append(checkbtn, taskspan);
    newTask.append(taskInput, deletebtn);
    tasks.appendChild(newTask);
    checkbtn.addEventListener("click", () => {
      newTask.classList.toggle("done");
      if (newTask.classList.contains("done")) {
        checkbtn.innerHTML =
          '<i class="fa-regular fa-circle-dot cursor-pointer" ></i>';
        taskCount--;
      } else {
        checkbtn.innerHTML =
          '<i class="fa-regular fa-circle cursor-pointer"></i>';
        taskCount++;
      }
      updatecount();
      savetask();
    });
    deletebtn.addEventListener("click", () => {
      newTask.remove();
      if (!newTask.classList.contains("done")) taskCount--;
      updatecount();
      savetask();
    });
    todoInput.value = "";
    updatecount();
  }
  savetask();
}

addBtn.addEventListener("click", addtask);
todoInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") addtask();
});

filteredBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const allTasks = document.querySelectorAll(".todo-item");
    const filter = btn.dataset.filter;
    filteredBtns.forEach((btn) => btn.classList.remove("active"));
    btn.classList.add("active");
    allTasks.forEach((task) => {
      task.classList.remove("hidden");
      if (filter === "active" && task.classList.contains("done"))
        task.classList.add("hidden");
      if (filter === "done" && !task.classList.contains("done"))
        task.classList.add("hidden");
    });
    // if (filter === "active") {
    //   allTasks.forEach((task) => {
    //     if (task.classList.contains("ok")) {
    //       task.classList.add("hidden");
    //     }
    //   });
    // } else if (filter === "done") {
    //   allTasks.forEach((task) => {
    //     if (!task.classList.contains("ok")) {
    //       task.classList.add("hidden");
    //     }
    // });
    // }
  });
});
clearDone.addEventListener("click", () => {
  document.querySelectorAll(".todo-item.done").forEach((task) => task.remove());
  savetask();
  updatecount();
});
