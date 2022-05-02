/*
| ====================================================================
| Selectores
| ====================================================================
*/

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button, .addItens");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const btn = document.querySelector('.btn');
const adicionaItens = document.getElementById(addItens);

/*
| ====================================================================
| Selectores - Dark-Mode
| ====================================================================
*/

const localMain = document.querySelector(".localMain");
const localHeader = document.querySelector(".localHeader");
const localSecao = document.querySelector('.localSecao');
const localForm = document.querySelector(".localForm");
const mainFooter = document.querySelector(".main-footer")


/*
| ====================================================================
| Event Lists
| ====================================================================
*/

document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

/*
| ====================================================================
| Funções
| ====================================================================
*/

function addTodo(e) {

    // Impedir que o formulário seja enviado
    e.preventDefault();

    // Criação de uma DIV com o nome de "TODO"
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    // Criação de listas
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;

    // Salvar informações no Local Storage
    saveLocalTodos(todoInput.value);
    
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    todoInput.value = "";

    // Criação do botão de completo
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

     // Criação do botão de Delete
     const trashButton = document.createElement("button");
     trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
     trashButton.classList.add("trash-btn");
     todoDiv.appendChild(trashButton);

     // Anexar na lista
     todoList.appendChild(todoDiv);
}

// Função para deleção de itens
function deleteCheck(e) {
    const item = e.target;

    if(item.classList[0] === "trash-btn") {
        const todo = item.parentElement;

        // Adição de animação para itens deletados
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", e => {
            todo.remove();
        })
    }

    // Condição para itens que são adcionados como completo
    if(item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        console.log(todo);
    }
}

// Função para efetuar a listagem dos "To-Dos"
function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
        }
    });
}

//Criando a função de salvar no Local Storage itens adicionados.
function saveLocalTodos(todo) {
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}
//Criando a função de salvar no Local Storage todos os itens
  function getTodos() {
    //console.log("hello");
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
      //Criação de uma lista com o nome "TODO"
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");

      //Criação da lista com o items todos
      const newTodo = document.createElement("li");
      newTodo.innerText = todo;
      newTodo.classList.add("todo-item");
      todoDiv.appendChild(newTodo);
      todoInput.value = "";

      //Criação do botão de "Complete"
      const completedButton = document.createElement("button");
      completedButton.innerHTML = `<i class="fas fa-check"></i>`;
      completedButton.classList.add("complete-btn");
      todoDiv.appendChild(completedButton);

      //Criação do botão de "Complete"
      const trashButton = document.createElement("button");
      trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
      trashButton.classList.add("trash-btn");
      todoDiv.appendChild(trashButton);

      todoList.appendChild(todoDiv);
    });
  }

function removeLocalTodos(todo) {
    console.log("remove_itens");
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1); 
    localStorage.setItem("todos", JSON.stringify(todos));
}

/*
| ===========================================================
|  Funções - DARK MODE
| ===========================================================
*/

btn.onclick = function() {
    this.classList.toggle('active');
    container_principal.classList.toggle('active');
}

/* Dark-Mode -> Header */
btn.onclick = function() {
    this.classList.toggle('active');
    localHeader.classList.toggle('active');
    localSecao.classList.toggle('active');
    localForm.classList.toggle('active');
    mainFooter.classList.toggle('active');
    localMain.classList.toggle('active');
}

// ação para modal

function iniciaModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('mostrar');
    console.log(modal);
    
}

adicionaItens.addEventListener('click', () => iniciaModal('modal-itens'));


