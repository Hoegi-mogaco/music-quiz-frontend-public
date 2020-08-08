export default class SongAPIHandler {
  constructor() {}

  async getSongs() {
    const songs = await fetch("/api/songs");
    return songs.json();
  }

  async getCountOfSongs() {
    const songCount = await fetch("/api/songs/count").then((response) => {
      return response.json();
    });

    return songCount.count;
  }
}
