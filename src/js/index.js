import CommonDOM from "./common/common.js";
import SongAPIHandler from "./api/SongAPIHandler.js";

CommonDOM.setCommonDOM();

const songHandler = new SongAPIHandler();

document.addEventListener("DOMContentLoaded", (event) => {
  renderSongCount();
});

async function renderSongCount() {
  const totalCount = await songHandler.getCountOfSongs();
  const initialValue = totalCount / 2 > 10000 ? totalCount - 10000 : 0;
  animateCount(initialValue, totalCount, 600);
}

function animateCount(initialValue, totalCount, time) {
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
