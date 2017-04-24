import todo from "../src/todo";
import chai from "chai";
const expect = chai.expect;

describe("todo.js test", () => {
    it("Delete todo", done => {
        let prev = document.querySelector(".todo-list").length;
        document.querySelector(".todo-list").click();
        let post = document.querySelector(".todo-list").length;
        expect(post).to.be.small(prev);
        done();
    })
});
