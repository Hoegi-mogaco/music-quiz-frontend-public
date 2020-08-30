import React from "react";

import QuizHeader from "./QuizHeader.js";
import MusicPlayer from "./MusicPlayer.js";
import AnswerForm from "./AnswerForm.js";
import HintButton from "./HintButton.js";
import SkipButton from "./SkipButton.js";
import HintModal from "./HintModal.js";

export default class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      song: props.song,
      showHint: false,
      result: [],
    };

    this.nextSong = this.nextSong.bind(this);
    this.playSong = this.playSong.bind(this);
    this.showHint = this.showHint.bind(this);
    this.fetchHint = this.fetchHint.bind(this);
    this.showSecondHint = this.showSecondHint.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  render() {
    return (
      <div className="flex flex-col justify-center items-center w-3/4 mx-auto max-w-xs mt-8">
        <QuizHeader
          currentIndex={this.props.currentIndex + 1}
          totalSongs={this.props.totalSongs}
        />
        <MusicPlayer playSong={this.playSong} audio={this.state.audio} />
        <AnswerForm
          id={this.props.song.id}
          nextSong={this.nextSong}
          setQuizResult={this.props.setQuizResult}
        />
        <HintButton song={this.props.song} showHint={this.showHint} />
        <SkipButton nextSong={this.nextSong} />
        {this.state.showModal ? (
          <HintModal
            song={this.props.song}
            showSecondHint={this.showSecondHint}
            toggleModal={this.toggleModal}
          />
        ) : null}
      </div>
    );
  }

  nextSong() {
    this.props.nextSong();
  }

  playSong() {
    const audio = new Audio(this.props.song.link);
    audio.addEventListener("timeupdate", () => {
      if (audio.currentTime > 1) {
        audio.pause();
        audio.currentTime = 0;
        this.setState({ audio });
      }
    });

    this.setState({ audio });

    audio.play();
  }

  async showHint() {
    if (!this.props.song.hasHint) {
      await this.fetchHint();
      const song = this.state.song;
      song.hasHint = true;
      this.refreshSong(song);
    }

    this.toggleModal();
  }

  async fetchHint() {
    const hints = await fetch(
      `/api/songs/hint/${this.props.song.id}`
    ).then((res) => res.json());

    const song = this.state.song;
    song.hint1 = hints.hint1;
    song.hint2 = hints.hint2;
    this.refreshSong(song);
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  showSecondHint() {
    const song = this.state.song;
    song.showSecondHint = true;
    this.refreshSong(song);
  }

  refreshSong(song) {
    this.setState({ song });
  }

  addResult(id, result) {
    result.push({ id, result });
  }
}
