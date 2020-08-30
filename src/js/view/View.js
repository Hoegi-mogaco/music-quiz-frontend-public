export default class View {
  constructor() {
    this.header = this.renderHeader();
  }

  renderHeader() {
    const header = document.createElement("header");
    header.classList.add(
      "container",
      "max-w-full",
      "bg-purple-500",
      "bg-opacity-75",
      "py-2"
    );
    const h1 = document.createElement("h1");
    h1.classList.add("text-center", "text-lg", "font-normal");
    const linkToIndex = document.createElement("a");
    linkToIndex.href = "/";
    linkToIndex.innerHTML = "음악 퀴즈";
    h1.appendChild(linkToIndex);
    header.appendChild(h1);
    return header;
  }

  renderView(target) {
    document.addEventListener("DOMContentLoaded", () => {
      document.body.prepend(this.header);
      this.init(target);
    });
  }
}
