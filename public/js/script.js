// API HELPER
async function get(url) {
    try {
        let res = await fetch(url);
        res = await res.json();
        return res;
    }
    catch (err) {
        console.log(err);
    }
}

async function post(url, data) {
    try {
        let res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        });
        res = res.json();
        return res;
    }
    catch (err) {
        console.log(err);
    }
}

async function patch(url, data) {
    try {
        let res = await fetch(url, {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        });
        res = res.json();
        return res;
    }
    catch (err) {
        console.log(err);
    }
}

async function del(url) {
    try {
        let res = await fetch(url, { method: 'DELETE' });
        res = res.json();
        return res;
    }
    catch (err) {
        console.log(err);
    }
}

// TASK TEMPLATE ---------------------
const template =
    `<li id={{id}} class="{{status}} flex-between">
        <div class="flex-column">
            <span>{{title}}</span>
            <div class="font-small">
                <span>{{author}}</span>
                <span>{{createdAt}}</span>
            </div>
        </div>
        <span id="deleteButton" class="deleteButton">x</span>
    </li>
    `

let $ulTodos = document.getElementById("ulTodos");

function generateTemplate(task) {
    let clone = template;
    clone = clone.replace("{{status}}", task.status ? "checked" : "")
    clone = clone.replace("{{id}}", task._id)
    clone = clone.replace("{{title}}", task.title)
    clone = clone.replace("{{author}}", task.author)
    clone = clone.replace("{{createdAt}}", task.createdAt)
    let $task = document.createElement("li");
    $ulTodos.appendChild($task);
    $task.outerHTML = clone;
}

// TASK SERVICE ---------------------
const API_URL = 'http://localhost:3000/api';

async function getTasks() {
    const tasks = await get(API_URL + "/tasks");
    console.log(tasks);
    for (let task of tasks) {
        generateTemplate(task);
    }
}
async function postTask(data) {
    const task = await post(API_URL + "/task", data);
    generateTemplate(task);
}
async function patchTask(id, data) {
    await patch(`${API_URL}/task/${id}`, data);
}
async function delTask(id, event) {
    let li = event.target.closest('li');
    li.parentElement.removeChild(li);
    del(`${API_URL}/task/${id}`);
}

// --------------------------------

getTasks();

// Add todo when clicking the add button
function newTodo() {
    const inputValue = document.getElementById("inputTitle").value;
    const user = "currentUser";
    const data = {
        title: inputValue,
        author: user
    }
    postTask(data);
}

// Listen for click (delete or mark as done)
$ulTodos.addEventListener('click', event => {
    let taskId = event.target.parentNode.id;
    let elementClicked = event.target;

    if (elementClicked.className === "deleteButton") {
        delTask(taskId, event);
    }
    if (elementClicked.tagName === "LI") {
        event.target.classList.toggle('checked');
        const status = event.target.classList.contains("checked");
        const data = { status: status }
        patchTask(taskId, data);
    }
})
