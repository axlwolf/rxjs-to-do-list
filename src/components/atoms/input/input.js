import { fromEvent } from "rxjs";
import { map, share } from "rxjs/operators";

class Input extends HTMLElement {
  static get observedAttributes() {
    return ["width", "height"];
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
<style>
  ${this.createStyleInnerHTML()}
</style>
<input type="text" />
    `.trim();

    this.$style = this.shadowRoot.querySelector("style");
    this.$input = this.shadowRoot.querySelector("input");
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName === "width" || attrName === "height") {
      this.$style.innerHTML = this.createStyleInnerHTML();
    }
  }

  createKeyup$() {
    return fromEvent(this.$input, "keyup").pipe(
      map(event => ({ value: event.target.value, keyCode: event.keyCode })),
      share()
    );
  }

  createStyleInnerHTML() {
    return `
input {
  width: ${this.width};
  height: ${this.height};

  box-sizing: border-box;

  padding: 0.24rem;
}
    `.trim();
  }

  get width() {
    return this.getAttribute("width") || "100%";
  }

  set width(width) {
    this.setAttribute("width", width);
  }

  get height() {
    return this.getAttribute("height") || "100%";
  }

  set height(height) {
    this.setAttribute("height", height);
  }
}

customElements.define("my-app-input", Input);

export default Input;
