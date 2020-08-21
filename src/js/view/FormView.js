import SongAPIHandler from "../api/SongAPIHandler.js";
import View from "./View.js";

export default class FormView extends View {
  constructor() {
    super();
    this.form = document.forms[0];
  }

  init() {
    this.onChangeFile();
    this.onSubmitForm();
    this.onKeyupHint();
  }

  onChangeFile() {
    this.form.file.addEventListener("change", (e) => {
      this.checkFileSize(e.currentTarget);
    });
  }

  checkFileSize(fileInput) {
    const fileSize = fileInput.files[0].size;
    if (fileSize > 100 * 1024) {
      alert("100KB 이하의 파일을 사용해주세요");
      fileInput.value = null;
    }
  }

  onSubmitForm() {
    this.form.addEventListener("submit", (e) => this.onSubmit(e));
  }

  onKeyupHint() {
    const hint1 = this.form.hint1;
    const hint2 = this.form.hint2;

    hint1.addEventListener("keyup", () => {
      if (hint1.value.length) {
        hint2.removeAttribute("disabled");
      } else {
        hint2.value = "";
        hint2.setAttribute("disabled", "");
      }
    });
  }

  async onSubmit(e) {
    e.preventDefault();
    const title = this.form.title.value;
    const artist = this.form.artist.value;
    const file = this.form.file.files[0];
    const hint1 = this.form.hint1.value;
    const hint2 = this.form.hint2.value;

    const song = {
      title,
      artist,
      file,
      hint1,
      hint2,
    };

    console.log(song);

    const response = await new SongAPIHandler().postSong(song);

    window.location.href = "/";
  }
}
