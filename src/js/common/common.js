const CommonDOM = {
  setCommonDOM() {
    createHeader();

    function createHeader() {
      const header = document.createElement("header");
      const h1 = document.createElement("h1");
      const linkToIndex = document.createElement("a");
      linkToIndex.href = "/";
      linkToIndex.innerHTML = "음악 퀴즈";
      h1.appendChild(linkToIndex);
      header.appendChild(h1);
      document.body.prepend(header);
    }
  },

  renderView(view, target) {
    this.setCommonDOM();
    document.addEventListener("DOMContentLoaded", () => view.init(target));
  },
};

export default CommonDOM;
