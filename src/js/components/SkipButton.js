import React from "react";
import swal from "sweetalert";

export default function SkipButton(props) {
  const onSkip = (e) => {
    swal({
      closeOnClickOutside: false,
      title: "정말 넘어갈까요?",
      text: "다시 돌아올 수 없어요",
      buttons: ["다시 도전", "다음 문제"],
      icon: "warning",
    }).then((answer) => {
      if (answer) {
        props.nextSong();
      }
    });
  };

  return (
    <button
      onClick={onSkip}
      className="border border-solid border-red-500 mt-1 px-2 py-2 w-4/5 text-xs"
    >
      😰 이번 문제 넘기기
    </button>
  );
}
