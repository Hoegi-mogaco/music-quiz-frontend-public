import SongAPIHandler from "../api/SongAPIHandler.js";
import View from "./View.js";

export default class SongListView extends View {
  constructor() {
    super();
    this.songApiHandler = new SongAPIHandler();
    this.SONG_PER_PAGE = 10;
    this.BUTTONS_TO_SHOW = 5;
    this.songList = [];
    this.page = 1;
  }

  init() {
    this.renderList();
  }

  async renderList() {
    const list = document.querySelector("div#song-list");

    if (this.songList.length === 0) {
      await this.loadList();
    }
    list.innerHTML = this.getSongListHtml();
    this.renderPageButton();
  }

  async loadList() {
    const songList = await this.songApiHandler.getSongs();
    this.songList = songList;
  }

  getSongListHtml() {
    const startIndex = (this.page - 1) * this.SONG_PER_PAGE;
    const endIndex = startIndex + this.SONG_PER_PAGE;

    const songToRender = this.songList.slice(startIndex, endIndex);

    return (
      songToRender.reduce((html, song) => {
        html += `<li>
            <div class="song-info">
              <span class="song-title">${song.title}</span>
              <span class="song-artist">${song.artist}</span>
            </div>
            <div class="song-preview">
              <audio src="${song.link}" />
            </div>
            <div class="song-approval">
              <span class="song-approved">
                ${
                  song.approved === "Y"
                    ? "승인됨"
                    : song.approved === "N"
                    ? "거절됨"
                    : "심사 중"
                }
              </span>
            </div>
          </li>`;
        return html;
      }, "<ul>") + "</ul>"
    );
  }

  renderPageButton() {
    const pageNavigator = document.querySelector("div#page-navigator");
    let totalPages =
      Math.trunc((this.songList.length - 1) / this.SONG_PER_PAGE) + 1;
    totalPages = Math.max(1, totalPages);

    const minPage = this.page - ((this.page - 1) % this.BUTTONS_TO_SHOW);
    const maxPage = Math.min(totalPages, minPage + this.BUTTONS_TO_SHOW - 1);

    const previousButton = document.createElement("button");
    previousButton.innerHTML = "<";
    previousButton.addEventListener("click", () => {
      this.page = minPage - 1;
      this.renderList();
    });

    const nextButton = document.createElement("button");
    nextButton.innerHTML = ">";
    nextButton.addEventListener("click", () => {
      this.page = maxPage + 1;
      this.renderList();
    });

    const pageButtons = [];

    for (let i = minPage; i <= maxPage; i++) {
      const pageButton = document.createElement("button");
      pageButton.innerHTML = i;
      pageButton.addEventListener("click", () => {
        this.page = i;
        this.renderList();
      });
      pageButtons.push(pageButton);
    }

    pageNavigator.innerHTML = "";

    if (minPage !== 1) {
      pageNavigator.appendChild(previousButton);
    }

    pageButtons.forEach((button) => pageNavigator.appendChild(button));

    if (maxPage !== totalPages) {
      pageNavigator.appendChild(nextButton);
    }
  }
}
