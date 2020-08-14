import CommonDOM from "./common/common.js";

CommonDOM.setCommonDOM();

const Form = {
  init(form) {
    this.form = form;
    this.form.file.addEventListener("change", (e) => {
      const fileInput = this.form.file;
      const fileSize = fileInput.files[0].size;
      if (fileSize > 100 * 1024) {
        alert("100KB 이하의 파일을 사용해주세요");
        fileInput.value = null;
      }
    });
  },

  onSubmit(e) {
    e.preventDefault();
    console.log(this.form.title.value);
    console.log(this.form.artist.value);
    console.dir(this.form.file.files[0]);
    console.log(this.form.hint1.value);
    console.log(this.form.hint2.value);

    debugger;
  },
};

Form.init(document.forms[0]);
Form.form.addEventListener("submit", (e) => {
  Form.onSubmit(e);
});
