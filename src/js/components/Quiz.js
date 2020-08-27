import React from "react";

import QuizHeader from "./QuizHeader.js";
import MusicPlayer from "./MusicPlayer.js";
import AnswerForm from "./AnswerForm.js";

export default class Quiz extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <QuizHeader
          currentIndex={this.props.currentIndex + 1}
          totalSongs={this.props.totalSongs}
        />
        <MusicPlayer link={this.props.song.link} />
        <AnswerForm id={this.props.song.id} nextSong={this.props.nextSong} />
        {/*
        <SubmitButton />
        <HintButton />
        <SkipButton /> */}
      </div>
    );
  }
}
