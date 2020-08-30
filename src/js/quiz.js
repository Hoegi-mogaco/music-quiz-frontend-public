import React from "react";
import ReactDOM from "react-dom";

import Header from "../js/components/Header.js";
import Quiz from "../js/components/Quiz.js";

import Song from "./model/Song.js";

import "../css/tailwind.css";
import "../css/quiz.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      songs: [],
      currentIndex: 0,
    };
  }

  render() {
    if (this.state.songs.length === 0) {
      return (
        <div>
          <Header />
          Loading...
        </div>
      );
    } else if (this.state.currentIndex < this.state.songs.length) {
      return (
        <div>
          <Header />
          <Quiz
            song={this.state.songs[this.state.currentIndex]}
            currentIndex={this.state.currentIndex}
            totalSongs={this.state.songs.length}
            nextSong={this.nextSong.bind(this)}
            setQuizResult={this.setQuizResult.bind(this)}
          />
        </div>
      );
    } else {
      return <div>결과 발표</div>;
    }
  }

  async componentDidMount() {
    const songs = await this.fetchSongs();
    this.setState({
      songs: songs.map((song) => new Song(song.id, song.link)),
    });
  }

  async fetchSongs() {
    const response = await fetch("/api/songs/quiz").then((response) =>
      response.json()
    );

    return response;
  }

  nextSong() {
    this.increaseIndex();
    const answer = document.getElementById("answer");
    if (answer) {
      answer.value = "";
    }
  }

  increaseIndex() {
    this.setState({
      currentIndex: ++this.state.currentIndex,
    });
  }

  setQuizResult(result) {
    this.state.songs[this.state.currentIndex].isCorrect = result;
    this.setState({
      songs: [...this.state.songs],
    });
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
