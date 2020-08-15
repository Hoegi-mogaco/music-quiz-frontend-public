import CommonDOM from "./common/common.js";
import SongAPIHandler from "./api/SongAPIHandler.js";

const FormView = {
  init(form) {
    this.form = form;
    this.onChangeFile();
    this.onSubmitForm();
  },

  onChangeFile() {
    this.form.file.addEventListener("change", (e) => {
      this.checkFileSize();
    });
  },

  checkFileSize() {
    const fileInput = this.form.file;
    const fileSize = fileInput.files[0].size;
    if (fileSize > 100 * 1024) {
      alert("100KB 이하의 파일을 사용해주세요");
      fileInput.value = null;
    }
  },

  onSubmitForm() {
    this.form.addEventListener("submit", (e) => this.onSubmit(e));
  },

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

    const response = await new SongAPIHandler().postSong(song);

    window.location.href = "/";
  },
};

CommonDOM.renderView(FormView, document.forms[0]);
