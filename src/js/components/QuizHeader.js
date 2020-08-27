import React from "react";

export default function QuizHeader(props) {
  return (
    <div>
      <h2>
        {props.currentIndex} / {props.totalSongs}
      </h2>
    </div>
  );
}
