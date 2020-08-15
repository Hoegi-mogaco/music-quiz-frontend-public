import CommonDOM from "./common/common.js";
import SongAPIHandler from "./api/SongAPIHandler.js";

const SongListView = {};
SongListView.LIST_PER_PAGE = 10;
SongListView.BUTTONS_TO_SHOW = 5;

SongListView.init = function (element) {
  this.element = element;
  this.pageNavigator = document.querySelector("#page-navigator");
  this.songList = [];
  this.page = 1;
  this.renderList();
};

SongListView.renderList = async function () {
  if (this.songList.length === 0) {
    await this.loadList();
  }
  this.element.innerHTML = this.getSongListHtml();
  this.renderPageButton();
};

SongListView.getSongListHtml = function () {
  const startIndex = (this.page - 1) * SongListView.LIST_PER_PAGE;
  const endIndex = startIndex + SongListView.LIST_PER_PAGE;

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
};

SongListView.renderPageButton = function () {
  let totalPages =
    Math.trunc((this.songList.length - 1) / this.LIST_PER_PAGE) + 1;
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

  this.pageNavigator.innerHTML = "";

  if (minPage !== 1) {
    this.pageNavigator.appendChild(previousButton);
  }

  pageButtons.forEach((button) => this.pageNavigator.appendChild(button));

  if (maxPage !== totalPages) {
    this.pageNavigator.appendChild(nextButton);
  }
};

SongListView.loadList = async function () {
  const songList = await new SongAPIHandler().getSongs();
  this.songList = songList;
};

CommonDOM.renderView(SongListView, document.querySelector("#song-list"));
