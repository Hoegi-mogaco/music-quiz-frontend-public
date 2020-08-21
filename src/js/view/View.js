export default class View {
  constructor() {
    this.renderHeader();
  }

  renderHeader() {
    const header = document.createElement("header");
    header.classList.add(
      "container",
      "max-w-full",
      "bg-purple-500",
      "bg-opacity-75"
    );
    const h1 = document.createElement("h1");
    const linkToIndex = document.createElement("a");
    linkToIndex.href = "/";
    linkToIndex.innerHTML = "음악 퀴즈";
    h1.appendChild(linkToIndex);
    header.appendChild(h1);
    document.body.prepend(header);
  }

  renderView(target) {
    document.addEventListener("DOMContentLoaded", () => this.init(target));
  }
}
