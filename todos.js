container = document.querySelector("#app");


todos = JSON.parse(localStorage.getItem("list-todos")) || [{ todo: "Fazer a Lista", finished: false }, { todo: "Compras", finished: true }];

// Filtra vazios
todos = todos.filter(function (el) {
    return el != null;
});
saveToStorage();

// Adicionando título
title = document.createElement("h1");
titleText = document.createTextNode("TO-DO APP");
title.appendChild(titleText);
container.appendChild(title);

// Criando form para todo
form = document.createElement("form");
form.setAttribute("name", "todo-form");
form.setAttribute("id", "todo-form");
form.setAttribute("method", "POST");
form.setAttribute("action", "#");
container.appendChild(form);

// Criando input para formulário
input = document.createElement("input");
input.setAttribute("type", "text");
input.setAttribute("name", "todo");
input.setAttribute("id", "todo");
input.setAttribute("placeholder", "Digite o todo");
input.setAttribute("required", "");
form = container.querySelector("#todo-form");
form.appendChild(input);

// Criando Lista
ul = document.createElement("ul");
ul.setAttribute("id", "todo-list");
container.appendChild(ul);

// Definindo submit pelo botão enter 
form = container.querySelector("#todo-form");

// Guarda input e a lista de itens
input = container.querySelector("#todo");
todosContainer = container.querySelector("#todo-list");


function renderTodos() {
    todos.forEach(function (todo, index) {
        // Cria item
        todoElement = document.createElement("li");

        // Cria ckeckbox para concluir todo
        todoCheck = document.createElement("input");
        todoCheck.setAttribute("type", "checkbox");
        todoCheck.setAttribute("class", "checkTodo");
        todoCheck.setAttribute("name", "checkTodo");
        todoCheck.setAttribute("rel", index);
        todoElement.appendChild(todoCheck);

        // Insere texto digitado
        todoSpan = document.createElement("span");
        todoText = document.createTextNode(todo.todo);

        // Verifica se está concluído    
        if (todo.finished == true) {
            todoSpan.style.textDecoration = "line-through";
            todoCheck.checked = true;
        }

        todoSpan.appendChild(todoText);
        todoElement.appendChild(todoSpan);

        // Insere link para remover todo
        todoRemove = document.createElement("a");
        todoRemove.setAttribute("class", "removeTodo");
        todoRemove.setAttribute("rel", index);
        todoRemoveText = document.createTextNode("Remove");
        todoRemove.appendChild(todoRemoveText);
        todoElement.appendChild(todoRemove);

        // Adiciona o item em tela
        todosContainer.appendChild(todoElement);

        // Ações para conclusão de item
        todoCheck.onclick = function () {
            rel = this.getAttribute("rel");
            if (this.checked == false) {
                todos[rel].finished = false;
                this.nextSibling.style.textDecoration = "none";
            } else {
                todos[rel].finished = true;
                this.nextSibling.style.textDecoration = "line-through";
            }
            saveToStorage()
        }

        todoSpan.onclick = function () {
            inputCheck = this.previousSibling;
            rel = inputCheck.getAttribute("rel");

            console.log(rel);

            if (inputCheck.checked == false) {
                inputCheck.checked = true;
                todos[rel].finished = true;
                this.style.textDecoration = "line-through";
            } else {
                inputCheck.checked = false;
                todos[rel].finished = false;
                this.style.textDecoration = "none";
            }
            saveToStorage()
        }

        // Ações para remover
        todoRemove.onclick = function () {
            rel = this.getAttribute("rel");
            this.parentElement.remove()
            delete todos[rel];
            saveToStorage()
        }
    });
}

// Renderiza todos
renderTodos();

// Criando Itens da Lista
form.addEventListener("submit", function (event) {

    // Previne o redirecionamento
    event.preventDefault();

    // Adiciona Novo Item no Array
    todos.push({
        todo: input.value,
        finished: false
    })
    saveToStorage()

    // Cria item
    todoElement = document.createElement("li");

    // Cria ckeckbox para concluir todo
    todoCheck = document.createElement("input");
    todoCheck.setAttribute("type", "checkbox");
    todoCheck.setAttribute("class", "checkTodo");
    todoCheck.setAttribute("name", "checkTodo");
    todoCheck.setAttribute("rel", todos.length - 1);
    todoElement.appendChild(todoCheck);

    // Insere texto digitado
    todoSpan = document.createElement("span");
    todoText = document.createTextNode(input.value);
    todoSpan.appendChild(todoText);
    todoElement.appendChild(todoSpan);
    // Insere link para remover todo
    todoRemove = document.createElement("a");
    todoRemove.setAttribute("class", "removeTodo");
    todoRemove.setAttribute("rel", todos.length - 1);
    todoRemoveText = document.createTextNode("Remove");
    todoRemove.appendChild(todoRemoveText);
    todoElement.appendChild(todoRemove);

    todosContainer.appendChild(todoElement);

    input.value = "";

    // Ações para conclusão de item
    todoCheck.onclick = function () {
        rel = this.getAttribute("rel");
        if (this.checked == false) {
            todos[rel].finished = false;
            this.nextSibling.style.textDecoration = "none";
        } else {
            todos[rel].finished = true;
            this.nextSibling.style.textDecoration = "line-through";
        }
        saveToStorage()
    }

    todoSpan.onclick = function () {
        inputCheck = this.previousSibling;
        rel = inputCheck.getAttribute("rel");

        if (inputCheck.checked == false) {
            inputCheck.checked = true;
            todos[rel].finished = true;
            this.style.textDecoration = "line-through";
        } else {
            inputCheck.checked = false;
            todos[rel].finished = false;
            this.style.textDecoration = "none";
        }
        saveToStorage()
    }

    // Ações para remover
    todoRemove.onclick = function () {
        rel = this.getAttribute("rel");
        this.parentElement.remove()
        delete todos[rel];
        saveToStorage()
    }
});

// Salvar no localStorage
function saveToStorage() {
    localStorage.setItem("list-todos", JSON.stringify(todos));
}