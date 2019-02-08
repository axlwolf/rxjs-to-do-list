import "../../organisms/to-do-app/to-do-app.js";

class MainPage extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
<style>
.container {
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
}

my-app-to-do-app {
  width: 70%;
  height: 70%;
}
</style>
<div class="container">
  <my-app-to-do-app></my-app-to-do-app>
</div>
    `;
  }
}

customElements.define("my-app-main-page", MainPage);

export default MainPage;
