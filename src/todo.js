import { ajaxApi as ajax } from './ajaxApi';

export default class Todo {
    init() {
		this.bindEvent();
        this.getFetch();
    }

    bindEvent() {
		document.querySelector(".new-todo")
				.addEventListener("keydown", this.keydownHandler.bind(this));
		document.querySelector(".todo-list")
				.addEventListener("click", this.destroy);
		document.querySelector(".todo-list")
			    .addEventListener("click", this.update);
	}

	getFetch() {
        const url = "http://128.199.76.9:8002/jbee/todo/";
        ajax.get(url).then((data) => {
            console.log(data);
        }).catch(() => {
            console.log("error!");
        });
    }

    createTemp(value) {
        const template = `
			<div class="view">
				<input type="checkbox" class="toggle"/>
				<label>${value}</label>
				<button class="destroy"></button>
				<input class="edit" value="${value}"/>
			</div>`;
        let li = document.createElement("li")
        li.innerHTML = template;
        return li;
    }

    addTodo(template, clear) {
        document.querySelector(".todo-list").appendChild(template);
        clear();
    }

	destroy(e) {
		if (e.target.classList.contains("destroy")) {
			e.target.parentNode.parentNode.remove();
		}
	}

	update(e) {
		if (e.target.classList.contains("toggle")) {
			e.target.parentNode.parentNode.classList.toggle("completed");
		}
	}

    keydownHandler(e) {
        let value = e.target.value
        if (e.which === 13 && value.trim() !== "") {
            this.addTodo(this.createTemp(value), () => e.target.value = "");
        }
    }
}

