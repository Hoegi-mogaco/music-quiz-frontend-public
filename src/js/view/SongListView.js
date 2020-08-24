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

  async init() {
    this.onSearch();
    await this.loadList();
    this.renderList(this.songList);
  }

  onSearch() {
    const searchInput = document.getElementById("song-search");
    searchInput.addEventListener(
      "keyup",
      delay((e) => {
        this.searchList(searchInput.value);
      }, 500)
    );
  }

  searchList(keyword) {
    const list = this.songList.filter(
      (song) =>
        song.title.indexOf(keyword) >= 0 || song.artist.indexOf(keyword) >= 0
    );
    this.page = 1;
    this.renderList(list);
  }

  async loadList() {
    const songList = await this.songApiHandler.getSongs();
    this.songList = songList;
  }

  async renderList(songList) {
    const songListDiv = document.getElementById("song-list");
    songListDiv.innerHTML = this.getSongListHtml(songList);
    this.renderPageButton(songList);
  }

  getSongListHtml(songList) {
    const startIndex = (this.page - 1) * this.SONG_PER_PAGE;
    const endIndex = startIndex + this.SONG_PER_PAGE;

    const songToRender = songList.slice(startIndex, endIndex);

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

  renderPageButton(songList) {
    const pageNavigator = document.querySelector("div#page-navigator");
    let totalPages = Math.trunc((songList.length - 1) / this.SONG_PER_PAGE) + 1;
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
        this.renderList(songList);
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

function delay(func, ms) {
  let timer = 0;
  console.log("Delay", func, ms);
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(func.bind(this, ...args), ms || 0);
  };
}
