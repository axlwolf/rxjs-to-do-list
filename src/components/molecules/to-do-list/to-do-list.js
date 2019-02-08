import { fromEvent } from "rxjs";
import { partition, map } from "rxjs/operators";

import { $ } from "../../../assets/js/commons.js";

class ToDoList extends HTMLElement {
  constructor() {
    super();

    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);

    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
<style>
ul {
  width: 100%;
  height: 100%;

  margin: 0;
  padding: 0;

  list-style: none;
  
  overflow-x: hidden;
  overflow-y: auto;
}
li {
  box-sizing: border-box;
  
  border: 1px solid black;

  height: 2.6rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 1.2rem;

  overflow: hidden;
}
.highlight {
  border: 3px solid red;
}
</style>
<ul>
</ul>
    `.trim();

    this.$ul = this.shadowRoot.querySelector("ul");

    const [$clickDelete, $clickListItem] = fromEvent(this.$ul, "click").pipe(
      partition(event => event.target.tagName.toLowerCase() === "button")
    );

    $clickDelete
      .pipe(
        map(event => event.target.closest("li")),
        map($li => $li.dataset.itemId)
      )
      .subscribe(this.removeItem);

    $clickListItem.pipe(
      map(event => event.target.closest('li')),
    ).subscribe($li => $li.classList.toggle('highlight'));
  }

  addItem({ id, value }) {
    const $li = $.el(`
<li data-item-id=${id}>
  <div>
    ${value}
  </div>
  <button type="button">
    DELETE
  </button>
</li>
    `);
    this.$ul.appendChild($li);
  }

  removeItem(id) {
    const item = this.$ul.querySelector(`li[data-item-id="${id}"]`);
    item && item.remove();
  }
}

customElements.define("my-app-to-do-list", ToDoList);

export default ToDoList;
