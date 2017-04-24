export default class Todo {
    init() {
		this.bindEvent();
    }

    bindEvent() {
		document.querySelector(".new-todo")
				.addEventListener("keydown", this.keydownHandler);
		document.querySelector(".todo-list")
				.addEventListener("click", this.destroy);
		document.querySelector(".todo-list")
			    .addEventListener("click", this.update);
	}

	keydownHandler(e) {
		const template = `
			<div class="view">
				<input type="checkbox" class="toggle"/>
				<label>${this.value}</label>
				<button class="destroy"></button>
				<input class="edit" value="${this.value}"/>
			</div>`;

		const createTemplate = (li, append) => {
			li.innerHTML = template;
			append(li);
		};

		const addTodo = (clear) => {
			createTemplate(document.createElement("li"), (li) => {
				document.querySelector(".todo-list").appendChild(li);
			});
			clear();
		};

		if (e.which === 13 && this.value.trim() !== "") {
			addTodo(() => this.value = "");
		}
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
}

