let addMessage = document.querySelector('.message');
let addButton = document.querySelector('.add');
let todo = document.querySelector('.todo');

if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages();
}

function newMeassage() {
    if (!addMessage.value) return;

    let newTodo = {
        todo: addMessage.value,
        checked: false,
        important: false,
    };

    todoList.push(newTodo);
    displayMessages();
    localStorage.setItem('todo', JSON.stringify(todoList));
    addMessage.value = '';
}

addButton.addEventListener('click', function () {
    newMeassage();
});

addMessage.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        newMeassage();
    }
});

function displayMessages() {
    let displayMessages = '';
    if (todoList.length === 0) {
        todo.innerHTML = '';
    }
    todoList.forEach(function (item, i) {
        displayMessages += `
        <li>
            <input type='checkbox' id='item_${i}'${item.checked ? 'checked' : ''}>
            <label for='item_${i}' class="${item.important ? 'important' : 'todo-li'}">${item.todo}</label>
            <button class="dell" id="dell">X</button>
            <button class="mark" id="mark">&#33;</button>
        </li>
        `;
        todo.innerHTML = displayMessages;
    })
}

todo.addEventListener('change', function (event) {
    let valueLabel = todo.querySelector('[for=' + event.target.getAttribute('id') + ']').innerHTML;

    todoList.forEach(function (item) {
        if (item.todo === valueLabel) {
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
});

todo.addEventListener('click', function (event) {
    if (event.target.className === 'dell') {
        const i = [].indexOf.call(todo.children, event.target.parentNode);
        todoList.splice(i, 1);
    } else if (event.target.className === 'mark') {
        const i = [].indexOf.call(todo.children, event.target.parentNode);
        console.log(i, todo, event.target);
        todoList[i].important = !todoList[i].important;
    }
    displayMessages();
    localStorage.setItem('todo', JSON.stringify(todoList));
});

todo.addEventListener('contextmenu', function (event) {
    event.preventDefault();

    todoList.forEach(function (item, i) {

        if (item.todo === event.target.innerHTML) {
            if (event.ctrlKey || event.metaKey) {
                todoList.splice(i, 1);
            } else {
                item.important = !item.important;
            }
            displayMessages();
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
});