import { ajaxApi as ajax } from './ajaxApi';

export default class Todo {
    constructor() {
        this.URL = "http://128.199.76.9:8002/jbee/todo/";
        this.COMPLETED = 1;
        this.NOT_COMPLETED = 0;
    }

    init() {
		this.bindEvent();
        this.getFetch();
    }

    bindEvent() {
		document.querySelector(".new-todo")
				.addEventListener("keydown", this.keydownHandler.bind(this));
		document.querySelector(".todo-list")
				.addEventListener("click", this.destroy.bind(this));
		document.querySelector(".todo-list")
			    .addEventListener("click", this.update.bind(this));
	}

	getFetch() {
        ajax.get(this.URL)
            .then((data) => this.addTodo(this.merge(document.createDocumentFragment(), data),
                () => console.log("fetch data success")))
            .catch((e) =>console.log("error: " + e));
    }

    merge(fragment, data) {
        data.forEach(d => fragment.appendChild(this.createTemplate(d.id, d.todo, d.completed)));
        return fragment;
    }

    //TODO-DOM
    createTemplate(id, value, completed) {
        const template = `
			<div class="view">
				<input type="checkbox" class="toggle"/>
				<label>${value}</label>
				<button class="destroy"></button>
				<input class="edit" value="${value}"/>
			</div>`;
        let li = document.createElement("li");
        li.setAttribute("data-id", id);
        if (completed) {
            li.classList.add("completed");
        }
        li.innerHTML = template;
        return li;
    }

    //TODO-DOM
    addTodo(template, clear) {
        document.querySelector(".todo-list").appendChild(template);
        clear();
    }

	destroy(e) {
        const id = e.target.parentNode.parentNode.getAttribute("data-id");
        ajax.del(this.URL + id)
            .then(() => this.deleteTodo(e.target.classList, e.target.parentNode.parentNode))
            .catch((e) => console.log("error: ", e));

	}

	//TODO-DOM
	deleteTodo(classList, todo) {
        if (classList.contains("destroy")) {
            todo.remove();
        }
    }

	update(e) {
        const todoClassList = e.target.parentNode.parentNode.classList;
        const id = e.target.parentNode.parentNode.getAttribute("data-id");
        let data = {
            "completed" : !todoClassList.contains("completed") + 0
        };

        ajax.put(this.URL + id, data)
            .then(() => this.updateTodoStatus(e.target.classList, todoClassList))
            .catch((e) => console.log("error: ", e));
	}

	//TODO-DOM
	updateTodoStatus(classList, todoClassList) {
        if (classList.contains("toggle")) {
            todoClassList.toggle("completed");
        }
    }

    keydownHandler(e) {
        const value = e.target.value;
        if (e.which === 13 && value.trim() !== "") {
            ajax.post(this.URL, { "todo" : value })
                .then((res) => this.addTodo(this.createTemplate(res.insertId, value, this.NOT_COMPLETED),
                    () => e.target.value = ""))
                .catch((e) => console.log("error: ", e));
        }
    }
}
