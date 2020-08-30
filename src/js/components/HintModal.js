import React from "react";

export default function HintModal(props) {
  const song = props.song;
  const hint1 = song.hint1 ? song.hint1 : "힌트가 없어요 😢";
  const hint2 = song.hint2;

  const onClickMoreHint = () => {
    props.showSecondHint();
  };

  const buttonClassName =
    "block border-solid border m-auto text-xs w-5/6 my-1 py-2 ";

  return (
    <div className="bg-gray-900 flex items-center justify-center h-full w-full absolute top-0 left-0 bg-opacity-50">
      <div className="modal bg-white px-4 py-6 w-3/4 rounded-lg">
        <ul className="w-3/4 mx-auto text-sm font-light mb-2">
          <li>{hint1}</li>
          {props.song.showSecondHint ? <li>{hint2}</li> : null}
        </ul>
        {props.song.showSecondHint || !hint2 ? null : (
          <button
            className={buttonClassName + "border-purple-500"}
            onClick={onClickMoreHint}
          >
            2번째 힌트
          </button>
        )}
        <button
          className={buttonClassName + "border-red-500"}
          onClick={props.toggleModal}
        >
          닫기
        </button>
      </div>
    </div>
  );
}
