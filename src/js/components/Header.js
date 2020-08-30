import React from "react";

export default function Header(props) {
  return (
    <header className="container max-w-full bg-purple-500 bg-opacity-75 py-2">
      <h1 className="text-center text-lg font-semibold">
        <a href="/">음악 퀴즈</a>
      </h1>
    </header>
  );
}
