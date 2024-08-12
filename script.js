let app = document.querySelector("#app");
let form = document.querySelector("#add-todo");
let noTodos = document.querySelector('#no-todos');

function loadSavedTodos() {
    let saved = localStorage.getItem('todos');
    console.log(saved)
    if (saved) {
        app.innerHTML = saved;
    } else {
        noTodos.removeAttribute('hidden');
    }
}

function addTodo(event) {
    event.preventDefault();

    if (!form.todo.value) return;

    let li = document.createElement("li");

    const colorPalette = ["#e9e9e9", "#d62828", "#80e0ff", "#ffcd52", "#8684ff", "#ecff79"];
    const randomColors = colorPalette[(Math.floor(Math.random() * colorPalette.length))];

    li.innerText = form.todo.value;
    li.style.backgroundColor = randomColors;

    let btnDelete = document.createElement("button");
    btnDelete.classList.add("btn-list", "btn-delete");
    btnDelete.innerHTML = "<span class='material-symbols-outlined' data-delete >delete</span>";

    // let btnEdit = document.createElement("button");
    // btnEdit.classList.add("btn-list", "btn-edit");
    // btnEdit.innerHTML = "<span class='material-symbols-outlined' data-edit>edit</span>";

    if (randomColors === "#d62828" || randomColors === "#8684ff") {
        li.style.color = "#fff";
        btnDelete.style.color = "#fff";
        // btnEdit.style.color = "#fff";
    }

    // li.append(btnEdit);
    li.append(btnDelete);
    app.append(li);

    noTodos.setAttribute('hidden', '');

    form.todo.value = '';

    localStorage.setItem('todos', app.innerHTML);
}

function removeTodo(event) {
    if (!event.target.matches("[data-delete]")) return;

    let li = event.target.closest("li");

    if (!li) return;
    li.remove();

    localStorage.setItem("todos", app.innerHTML);

    if (!app.innerHTML.trim().length) {
        noTodos.removeAttribute('hidden');
    }
}

function markAsDone(event) {
    let li = event.target.closest("li");

    li.classList.toggle("done");

    localStorage.setItem('todos', app.innerHTML);
}

form.addEventListener("submit", addTodo);

document.addEventListener("click", removeTodo);

document.addEventListener("click", markAsDone);

loadSavedTodos();