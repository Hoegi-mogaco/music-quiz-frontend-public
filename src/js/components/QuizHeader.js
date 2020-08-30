import React from "react";

export default function QuizHeader(props) {
  return (
    <h2 className="font-semibold text-gray-900 text-4xl mb-4">
      {props.currentIndex} / {props.totalSongs}
    </h2>
  );
}
