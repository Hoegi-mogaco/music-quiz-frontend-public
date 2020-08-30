import React from "react";

export default function HintButton(props) {
  return (
    <button
      onClick={props.showHint}
      className="border border-solid border-yellow-500 mt-1 px-2 py-2 w-4/5 text-xs"
    >
      📝 힌트 보기
    </button>
  );
}
