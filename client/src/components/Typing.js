import React from "react";
import ReactTypingEffect from "react-typing-effect";

const Typing = () => {
  return (
    <>
      <ReactTypingEffect text={["Hello.", "World!"]} />

      <br />

      <ReactTypingEffect
        text={["coffee", "Mexican", "ice cream", "Thai"]}
        cursorRenderer={(cursor) => <h1>{cursor}</h1>}
        displayTextRenderer={(text, i) => {
          return (
            <h1>
              {text.split("").map((char, i) => {
                const key = `${i}`;
                return (
                  <span
                    key={key}
                    style={i % 2 === 0 ? { color: "magenta" } : {}}
                  >
                    {char}
                  </span>
                );
              })}
            </h1>
          );
        }}
      />
    </>
  );
};

export default Typing;
