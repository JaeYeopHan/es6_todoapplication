import * as log from "loglevel";
import Observer from "./observer";

export default class todoApi {
    constructor() {
        this.observer = new Observer()
    }

    removeTodo(classList, todo) {
        if (classList.contains("destroy")) {
            todo.remove();
        }
    }

    updateTodoStatus(classList, todoClassList) {
        if (classList.contains("toggle")) {
            todoClassList.toggle("completed");
        }
    }

    merge(fragment, todos) {
        this.observer.init(todos);
        todos.forEach(todo => fragment.appendChild(this.createTemplate(todo)));
        return fragment;
    }

    createTemplate(data) {
        let li = document.createElement("li");
        let checked;
        li.setAttribute("data-id", data.id);
        if (data.completed) {
            li.classList.add("completed");
            checked = "checked";
        }
        const template = `
			<div class="view">
				<input type="checkbox" class="toggle" ${checked}/>
				<label>${data.todo}</label>
				<button class="destroy"></button>
				<input class="edit" value="${data.todo}"/>
			</div>`;
        li.innerHTML = template;
        return li;
    }

    addTodo(template, clear = () => log.info("add task success")) {
        document.querySelector(".todo-list").appendChild(template);
        this.observer.observe();
        clear();
    }
}