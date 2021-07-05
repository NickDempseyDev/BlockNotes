import React, { useEffect, useState } from "react";
import UserPromptNoNote from "./UserPromptNoNote";
import { InlineMath, BlockMath } from 'react-katex'

const Editor = (props) => {
  const [isNote, setIsNote] = useState(true);
  const [text, setText] = useState("");
  const [focus, setFocus] = useState(false);

  const parser = (blocks) => {
    let arr = [];
    arr = text.split("$$");
    return arr;
  };

  useEffect(() => {
    if (!props.note) {
      setIsNote(true);
    }
  }, []);

  return (
    <div>
      {isNote ? (
        <div
          className="block-render"
          onClick={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        >
          {!focus ? (
            parser(props.note.blocks).map((x, i) => {
              return i % 2 === 0 ? (
                <span>{x}</span>
              ) : (
                <InlineMath>{x}</InlineMath>
              );
            })
          ) : (
            <textarea
              className="block-txtarea"
              autoFocus={focus}
              onInput={(e) => setText(e.target.value)}
            >
              {text}
            </textarea>
          )}
        </div>
      ) : (
        <UserPromptNoNote />
      )}
    </div>
  );
};
export default Editor;
