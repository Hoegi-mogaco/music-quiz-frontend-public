export default class Song {
  constructor(id, link) {
    this.id = id;
    this.link = link;

    this.isCorrect = false;
    this.hasHint = false;
    this.showSecondHint = false;
  }
}
