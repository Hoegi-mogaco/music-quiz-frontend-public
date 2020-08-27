import React from "react";

let audioObject;

export default function MusicPlayer(props) {
  const playMusic = () => {
    if (audioObject) {
      audioObject.pause();
    }
    audioObject = new Audio(props.link);
    audioObject.play();
  };

  return <button onClick={playMusic}>재생</button>;
}
