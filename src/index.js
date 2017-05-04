import Todo from "./todo";
import Status from "./status";
import "../style/base.css";
import "../style/index.css";

(function() {
    new Todo().init();
    new Status().init();
})();