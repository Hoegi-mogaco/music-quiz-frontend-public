import React from "react";
import ReactDOM from "react-dom";

import Header from "../js/components/Header.js";
import Quiz from "../js/components/Quiz.js";

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
    } else {
      return (
        <div>
          <Header />
          <Quiz
            song={this.state.songs[this.state.currentIndex]}
            currentIndex={this.state.currentIndex}
            totalSongs={this.state.songs.length}
            nextSong={this.nextSong.bind(this)}
          />
          <button onClick={this.onClickButton.bind(this)}>index</button>
        </div>
      );
    }
  }

  async componentDidMount() {
    const songs = await this.fetchSongs();
    this.setState({
      songs,
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
  }

  increaseIndex() {
    this.setState({
      currentIndex: ++this.state.currentIndex,
    });
  }

  onClickButton() {
    this.setState({
      currentIndex: ++this.state.currentIndex,
    });
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
