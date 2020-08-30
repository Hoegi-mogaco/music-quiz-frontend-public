import React from "react";
import swal from "sweetalert";

export default function AnswerForm(props) {
  const onSubmit = async (e) => {
    e.preventDefault();
    const answerInput = document.getElementById("answer");
    const userAnswer = answerInput.value;
    if (!userAnswer) {
      swal({
        title: "답을 입력해주세요",
        button: "돌아가기",
        icon: "warning",
      });
      return;
    }

    const body = {
      id: props.id,
      answer: userAnswer,
    };

    const response = await fetch(`/api/songs/answer`, {
      method: "POST",
      body: JSON.stringify(body),
    }).then((res) => res.json());

    const isCorrect = response.correct;

    if (isCorrect) {
      swal({
        closeOnClickOutside: false,
        title: "정답!",
        text: `${response.artist} - ${response.title}`,
        icon: "success",
        button: "다음 문제",
      }).then((value) => {
        props.setQuizResult(isCorrect);
        props.nextSong();
      });
    } else {
      swal({
        title: "틀렸습니다!",
        text: "다시 한 번 확인해보세요",
        button: "다시 도전",
        icon: "error",
      });
    }
  };

  return (
    <form className="w-4/5">
      <input
        id="answer"
        type="text"
        className="border border-black border-solid focus:b-10 px-2 py-1 block w-full"
        autoComplete="off"
      />
      <button
        onClick={onSubmit}
        className="border border-solid border-blue-500 mt-1 px-2 py-2 w-full text-xs"
      >
        정답 확인
      </button>
    </form>
  );
}
