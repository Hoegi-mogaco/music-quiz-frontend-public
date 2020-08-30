import React from "react";
import { faVolumeUp, faVolumeOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MusicPlayer(props) {
  const className = "text-4xl ";

  const icon =
    props.audio && !props.audio.paused ? (
      <FontAwesomeIcon
        icon={faVolumeUp}
        className={className + "text-blue-400"}
      />
    ) : (
      <FontAwesomeIcon
        icon={faVolumeOff}
        className={className + "text-gray-500"}
      />
    );

  return (
    <button
      onClick={props.playSong}
      className="outline-none focus:outline-none cursor-pointer mb-4"
    >
      {icon}
    </button>
  );
}
