import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import UserPromptNoNote from "./UserPromptNoNote";
import Block from "./Block";

const Editor = (props) => {
  const [blocks, setBlocks] = useState([]);
  const countRender = useRef(0);

  useEffect(async () => {
    if (countRender.current === 0 && props.note.blocks !== undefined) {
      // set the blocks for the first render 
      setBlocks(props.note.blocks);
      countRender.current++;
      let size = props.note.blocks.length;
      let arr = [];
      while (size--) {
        arr.push(false);
      }
    }
    else {
      if (JSON.stringify(blocks) === JSON.stringify(props.note)) {
        // This is where a change of note will be handled. Saving, etc.
      }
    }
    //console.log(props.note.blocks.length);
  }, [props.note])

  const createNewBlock = async (idx, newText, oldText) => {
    let arr = blocks.slice();
    arr.splice(idx, 1, oldText)
    arr.splice(idx + 1, 0, newText);
    console.log(arr);
    await setBlocks(arr);
    let elements = document.querySelectorAll("#block-render")[idx + 1];
    elements.focus();
  };

  // const createNewBlock = async (idx, text) => {
  //   let arr = blocks.slice();
  //   arr.splice(idx + 1, 0, text);
  //   await setBlocks(arr);
  //   let elements = document.querySelectorAll("[tabIndex]")[idx + 2];
  //   elements.focus();
  // };

  const deleteBlock = async (idx) => {
    if (idx === 0) return;
    let arr = blocks.slice();
    arr.splice(idx, 1);
    await setBlocks(arr);
    let elements = document.querySelectorAll("#block-render")[idx - 1];
    elements.focus();
    console.log(elements);
    let element2 = document.querySelector(":focus");
    element2.value += "";
    element2.selectionStart = element2.value.length;
  };

  const addToExistingBlock = async (idx, text) => {
    if (idx === 0) return;
    let arr2 = blocks.slice();
    arr2[idx - 1] += (" " + text);
    console.log(arr2[idx - 1]);
    arr2.splice(idx, 1);
    await setBlocks(arr2);
    let newElement = document.querySelectorAll("[tabIndex]")[idx - 1];
    newElement.focus();
    let newElement2 = document.querySelector(":focus");
    newElement2.selectionStart = newElement2.value.length - text.length;
  }

  const printBlocks = () => {
    console.log(blocks);
  }

  const saveToDB = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: {
        name: props.note.title_,
        text: blocks,
        note_id: props.note._id
      },
    };

    try {
      await axios.put("/api/notes/updatenote", config);
      console.log("Saved");
    } catch (error) {
      localStorage.removeItem("authToken");
    }
  };

  return (
    <div>
      <button onClick={() => saveToDB()}>Save</button>
      {blocks ? (
        blocks.map((block, idx) => {
          return <Block key={block + idx} text={block} focusObj={{ index: idx, createBlock: createNewBlock, deleteBlock: deleteBlock, addToExistingBlock: addToExistingBlock }} />;
        })
      ) : (
        <UserPromptNoNote />
      )}
      {/* <button onClick={()=>{printBlocks();}}>BLocks</button> */}
    </div>
  );
};
export default Editor;
