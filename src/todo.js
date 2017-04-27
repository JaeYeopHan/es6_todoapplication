import * as log from "loglevel";

import ajax from './ajaxApi';
import todoApi from './todoApi';

export default class Todo {
    constructor() {
        this.URL = "http://128.199.76.9:8002/jbee/todo/";
        this.ENTER_KEY = 13;
        this.NOT_COMPLETED = 0;
        this.COMPLETED = 1;
        this.dom = new todoApi();
    }

    init() {
        this._bindEvent();
        this._getFetch();
    }

    _bindEvent() {
        document.querySelector(".new-todo")
                .addEventListener("keydown", this._add.bind(this));
        document.querySelector(".todo-list")
                .addEventListener("click", this._remove.bind(this));
        document.querySelector(".todo-list")
                .addEventListener("click", this._update.bind(this));
    }

    _getFetch() {
        return ajax.get(this.URL).then((todos) => {
            this.dom.addTodo(this.dom.merge(document.createDocumentFragment(), todos));
        }).catch((e) => {
            log.error("error: " + e);
        });
    }

    _remove(e) {
        const todoElm = e.target.parentNode.parentNode;
        const id = todoElm.getAttribute("data-id");
        if (e.target.classList.contains("destroy")) {
            return ajax.del(this.URL + id).then(() => {
                this.dom.removeTodo(e.target.classList, todoElm);
            }).catch((e) => {
                log.error("error: ", e);
            });
        }
    }

    _update(e) {
        const todoElm = e.target.parentNode.parentNode;
        const id = todoElm.getAttribute("data-id");
        const data = {
            "completed": todoElm.classList.contains("completed")
                ? this.NOT_COMPLETED : this.COMPLETED
        };

        return ajax.put(this.URL + id, data).then(() => {
            this.dom.updateTodoStatus(e.target.classList, todoElm.classList);
        }).catch((e) => {
            log.error("error: ", e);
        });
    }

    _add(e) {
        const value = e.target.value;
        if (this._isCorrectInput(e)) {
            return;
        }
        return ajax.post(this.URL, {"todo": value}).then((res) => {
            this.dom.addTodo(this.dom.createTemplate({
                id: res.insertId,
                todo: value,
                completed: this.NOT_COMPLETED
            }), () => e.target.value = "");
        }).catch((e) => {
            log.error("error: ", e);
        });
    }

    _isCorrectInput(e) {
        return e.which === this.ENTER_KEY && e.target.value.trim() !== "";
    }
}
