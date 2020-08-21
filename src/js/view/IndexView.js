import SongAPIHandler from "../api/SongAPIHandler.js";
import View from "./View.js";

export default class IndexView extends View {
  constructor() {
    super();
    this.songHandler = new SongAPIHandler();
  }

  init() {
    this.renderSongCount();
  }

  async renderSongCount() {
    const totalCount = await this.songHandler.getCountOfSongs();
    const initialValue = totalCount / 2 > 10000 ? totalCount - 10000 : 0;
    this.animateCount(initialValue, totalCount, 600);
  }

  animateCount(initialValue, totalCount, time) {
    const songCount = document.querySelector("span#song-count");

    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = (timestamp - startTimestamp) / time;
      const calculatedCount =
        Math.floor((totalCount - initialValue) * progress) + initialValue;
      const currentCount = Math.min(calculatedCount, totalCount);

      songCount.innerHTML = currentCount.toLocaleString();

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }
}
