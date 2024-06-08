document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    savedTodos.forEach(todo => addTodoToDOM(todo));

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newTodo = {
            text: todoInput.value,
            completed: false
        };
        addTodoToDOM(newTodo);
        saveTodoToLocalStorage(newTodo);
        todoInput.value = '';
    });

    todoList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const li = e.target.parentElement;
            const text = li.firstChild.textContent;
            removeTodoFromLocalStorage(text);
            li.remove();
        } else if (e.target.tagName === 'LI') {
            e.target.classList.toggle('completed');
            const text = e.target.firstChild.textContent;
            toggleTodoCompletionInLocalStorage(text);
        }
    });

    function addTodoToDOM(todo) {
        const li = document.createElement('li');
        li.textContent = todo.text;
        if (todo.completed) {
            li.classList.add('completed');
        }
        const button = document.createElement('button');
        button.textContent = 'Delete';
        li.appendChild(button);
        todoList.appendChild(li);
    }

    function saveTodoToLocalStorage(todo) {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function removeTodoFromLocalStorage(text) {
        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos = todos.filter(todo => todo.text !== text);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function toggleTodoCompletionInLocalStorage(text) {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        const todo = todos.find(todo => todo.text === text);
        if (todo) {
            todo.completed = !todo.completed;
            localStorage.setItem('todos', JSON.stringify(todos));
        }
    }
});