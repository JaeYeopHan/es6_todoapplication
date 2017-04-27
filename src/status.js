export default class Status {
    constructor() {
        this.todoList = document.querySelector(".todo-list");
        this.ALL_CONDITION = "#/all";
        this.ACTIVE_CONDITION = "#/active";
        this.COMPLETED_CONDITION = "#/completed";

        this.filtering = {
            [this.ALL_CONDITION]: todosClassList => {
                todosClassList.remove("show-active");
                todosClassList.remove("show-completed");
            },
            [this.ACTIVE_CONDITION]: todosClassList => {
                todosClassList.add("show-active");
                todosClassList.remove("show-completed");
            },
            [this.COMPLETED_CONDITION]: todosClassList => {
                todosClassList.add("show-completed");
                todosClassList.remove("show-active");
            }
        };
    }

    init() {
        this._bindEvent();
    }

    _bindEvent() {
        document.querySelector(".filters")
                .addEventListener("click", this._selected.bind(this));
    }

    _selected(e) {
        e.preventDefault();
        const selectedFilter = e.target;
        if (selectedFilter.classList.contains("selected")) {
            return;
        }
        this._deleteSelected(e.currentTarget.children, () => {
            selectedFilter.classList.add("selected");
        });
        const option = selectedFilter.getAttribute("href");
        this.filtering[option](this.todoList.classList)
    }

    _deleteSelected(filters, selectFilter) {
        for (let li of filters) {
            li.children[0].classList.remove("selected")
        }
        selectFilter();
    }
}
