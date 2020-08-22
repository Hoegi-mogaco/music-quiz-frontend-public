import React from "react";

import MusicPlayer from "./MusicPlayer.js";

export default class QuizApp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <MusicPlayer
          link={this.props.song.link}
          playMusic={this.playMusic.bind(this)}
        />
        {/* <Answer />
        <SubmitButton />
        <HintButton />
        <SkipButton /> */}
      </div>
    );
  }

  playMusic() {
    const audio = new Audio(this.props.song.link);
    audio.play();
  }
}
