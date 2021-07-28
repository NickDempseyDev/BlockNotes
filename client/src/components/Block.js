import React, { useState, useEffect, useRef } from "react";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";
import "./Block.css";

const Block = (props) => {
  const [text, setText] = useState("");
  const [focus, setFocus] = useState(false);
  const textAreaRef = useRef();

  const handleKeyDown = async (event) => {
    switch (event.key) {
      case "Enter":
        event.preventDefault();
        let cursorPos = textAreaRef.current.selectionStart;
        let lastCharPos = textAreaRef.current.value.length;
        if (cursorPos > 0) {
          let prevBlockText = text.substring(0, cursorPos);
          let newBlockText = text.substring(cursorPos, lastCharPos);
          await props.focusObj.createBlock(props.focusObj.index, newBlockText, prevBlockText);
        }
        else {
          await props.focusObj.createBlock(props.focusObj.index, text, "");
        }
        break;

      case "Backspace":
        if (textAreaRef.current.value.length === 0) {
          await props.focusObj.deleteBlock(props.focusObj.index);
        }
        else {
          // adds the text from the block being deleted to the previous block
          if (textAreaRef.current.selectionStart === 0 && textAreaRef.current.selectionEnd === 0) {
            let text = textAreaRef.current.value;
            await props.focusObj.addToExistingBlock(props.focusObj.index, text);
            // await props.focusObj.deleteBlock(props.focusObj.index);
          }
        }
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    setText(props.text);
  }, [props.text]);

  const parser = (text) => {
    let arr = [];
    arr = text.split("$$");
    return arr;
  };

  const handleFocus = (set) => {
    setFocus(set);
  };

  return (
    <div
      tabIndex={0}
      id="block-render"
      className="block-render"
      onClick={() => handleFocus(true)}
      onFocus={() => handleFocus(true)}
      onBlur={() => handleFocus(false)}
    >
      {!focus ? (
        parser(text).map((x, i) => {
          return i % 2 === 0 ? (
            <span key={x + i}>{x}</span>
          ) : (
            <InlineMath key={x + i}>{x}</InlineMath>
          );
        })
      ) : (
        <textarea
          id="block-textarea"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          ref={textAreaRef}
          value={text}
          className="block-txtarea"
          autoFocus={focus}
          onInput={(e) => setText(e.target.value)}
        >
          {text}
        </textarea>
      )}
      <br />
    </div>
  );
};

export default Block;
