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

    _remove({target}) {
        const todoElm = target.parentNode.parentNode;
        const id = todoElm.getAttribute("data-id");
        if (target.classList.contains("destroy")) {
            return ajax.del(this.URL + id).then(() => {
                this.dom.removeTodo(target.classList, todoElm);
            }).catch((e) => {
                log.error("error: ", e);
            });
        }
    }

    _update({target}) {
        const todoElm = target.parentNode.parentNode;
        const id = todoElm.getAttribute("data-id");
        const data = {
            "completed": todoElm.classList.contains("completed")
                ? this.NOT_COMPLETED : this.COMPLETED
        };

        return ajax.put(this.URL + id, data).then(() => {
            this.dom.updateTodoStatus(target.classList, todoElm.classList);
        }).catch((e) => {
            log.error("error: ", e);
        });
    }

    _add({target, which}) {
        const todo = target.value;
        if (!this._isCorrectInput(which, target)) {
            return;
        }
        return ajax.post(this.URL, {todo}).then((res) => {
            this.dom.addTodo(this.dom.createTemplate({
                id: res.insertId,
                todo,
                completed: this.NOT_COMPLETED
            }), () => target.value = "");
        }).catch((e) => {
            log.error("error: ", e);
        });
    }

    _isCorrectInput(which, target) {
        return which === this.ENTER_KEY && target.value.trim() !== "";
    }
}
