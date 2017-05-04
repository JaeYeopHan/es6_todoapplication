export default class Observer {
    constructor() {
        this.todoList = document.querySelector(".todo-list");
        this.counter = document.querySelector(".todo-count strong");
    }

    init(todos) {
        this.counter.textContent = todos.filter(todo => !todo.completed).length;
    }

    observe() {
        const observer = new MutationObserver(() => {
            this.counter.textContent = this.todoList.children.length;
        });

        observer.observe(this.todoList, { childList: true });
    }
}
