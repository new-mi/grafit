/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import ContentEditable from "react-contenteditable";

const EditableBlock = (props) => {
  const contentEditableRef = useRef();
  const [state, setState] = useState({
    htmlBackup: null,
    tag: props.tag,
    html: props.html,
    previousKey: "",
  });

  useEffect(() => {
    props.updatePage({
      id: props.id,
      tag: state.tag,
    });
  }, [state.tag]);

  useEffect(() => {
    props.updatePage({
      id: props.id,
      html: state.html,
    });
  }, [state.html]);

  const onChange = (e) => {
    setState((state) => ({
      ...state,
      html: e.target.value,
    }));
  };

  const onKeyDownHandler = (e) => {
    if (e.key === "/") {
      setState((state) => ({ ...state, htmlBackup: state.html }));
    }
    if (e.key === "Enter") {
      if (state.previousKey !== "Shift") {
        e.preventDefault();
        props.addBlock({
          id: props.id,
          ref: contentEditableRef.current,
        });
      }
    }
    if (e.key === "Backspace" && !e.target.textContent) {
      e.preventDefault();
      props.deleteBlock({
        id: props.id,
        ref: contentEditableRef.current,
      });
    }
    setState((state) => ({ ...state, previousKey: e.key }));
  };

  return (
    <>
      <ContentEditable
        className="block"
        innerRef={contentEditableRef}
        html={state.html}
        tagName={state.tag}
        onChange={onChange}
        onKeyDown={onKeyDownHandler}
      />
    </>
  );
};

export default EditableBlock;
