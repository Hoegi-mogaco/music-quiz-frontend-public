import React from "react";

export default function AnswerForm(props) {
  const onSubmit = async (e) => {
    e.preventDefault();
    const answerInput = document.getElementById("answer");
    const userAnswer = answerInput.value;
    if (!userAnswer) {
      alert("답을 입력해주세요");
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
      alert("정답!");
      props.nextSong();
      answerInput.value = "";
    } else {
      alert("틀렸습니다.");
    }
  };

  return (
    <form>
      <input id="answer" type="text" />
      <button onClick={onSubmit}>정답 확인</button>
    </form>
  );
}
