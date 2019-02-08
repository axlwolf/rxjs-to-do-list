import { tap } from "rxjs/operators";

import "../../atoms/input/input.js";
import "../../atoms/title/title.js";
import "../../molecules/to-do-list/to-do-list.js";

class ToDoApp extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
<style>
.app {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
}
my-app-to-do-list {
  height: 0;
  flex-grow: 1;
}
</style>
<div class="app">
  <my-app-title></my-app-title>
  <my-app-input height="2rem"></my-app-input>
  <my-app-to-do-list></my-app-to-do-list>
</div>
    `.trim();

    const $input = this.shadowRoot.querySelector("my-app-input");
    const $toDoList = this.shadowRoot.querySelector("my-app-to-do-list");

    const item$ = this.shadowRoot
      .querySelector("my-app-input")
      .createKeyup$()
      .pipe(tap($input.resetInput));

    item$.subscribe($toDoList.addItem);
  }
}

customElements.define("my-app-to-do-app", ToDoApp);

export default ToDoApp;
