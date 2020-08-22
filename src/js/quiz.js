import React from "react";
import ReactDOM from "react-dom";

import Header from "./components/Header.js";
import QuizApp from "./components/QuizApp.js";

class Quiz extends React.Component {
  constructor() {
    super();
    this.state = {
      songs: [],
      currentIndex: 0,
    };
  }

  async componentDidMount() {
    const songs = await this.fetchSongs();
    this.setState({
      songs,
    });
  }

  render() {
    if (this.state.songs.length === 0) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <Header />
          <QuizApp song={this.state.songs[this.state.currentIndex]} />
        </div>
      );
    }
  }

  async fetchSongs() {
    const response = await fetch("/api/songs/quiz").then((response) =>
      response.json()
    );

    return response;
  }
}

ReactDOM.render(<Quiz />, document.getElementById("app"));
