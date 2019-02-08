class Title extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
<style>
  h1 {
    font-size: 1.4rem;

    margin: 0 0 1rem 0;

    width: 100%;
    height: 2rem;

    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
<h1>To Do List</h1>
    `;
  }
}

customElements.define("my-app-title", Title);

export default Title;
