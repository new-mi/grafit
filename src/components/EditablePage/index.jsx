import { useStateCallback } from "../../hooks/useStateCallback";
import EditableBlock from "../EditableBlock";

const uid = () =>
  Date.now().toString(36) + Math.random().toString(36).substr(2);

const setCaretToEnd = (element) => {
  const range = document.createRange();
  const selection = window.getSelection();
  range.selectNodeContents(element);
  range.collapse(false);
  selection.removeAllRanges();
  selection.addRange(range);
  element.focus();
};

const initialBlock = {
  id: uid(),
  tag: "p",
  html: "",
};

const EditablePage = (props) => {
  const [blocks, setBlocks] = useStateCallback([initialBlock]);

  const updatePageHandler = (updatedBlock) => {
    const localBlocks = [...blocks];
    const index = localBlocks.map((b) => b.id).indexOf(updatedBlock.id);
    const updatedBlocks = localBlocks;
    updatedBlocks[index] = {
      ...updatedBlocks[index],
      ...updatedBlock,
    };
    setBlocks(updatedBlocks);
  };
  const addBlockHandler = (currentBlock) => {
    const newBlock = { id: uid(), html: "", tag: "p" };
    const localBlocks = [...blocks];
    const index = localBlocks.map((b) => b.id).indexOf(currentBlock.id);
    const updatedBlocks = localBlocks;
    updatedBlocks.splice(index + 1, 0, newBlock);
    setBlocks(updatedBlocks, (s) => {
      currentBlock.ref.nextElementSibling.focus();
    });
  };
  const deleteBlockHandler = (currentBlock) => {
    const previousBlock = currentBlock.ref.previousElementSibling;
    if (previousBlock) {
      const localBlocks = [...blocks];
      const index = localBlocks.map((b) => b.id).indexOf(currentBlock.id);
      const updatedBlocks = localBlocks;
      updatedBlocks.splice(index, 1);
      setBlocks(updatedBlocks, (s) => {
        setCaretToEnd(previousBlock);
        previousBlock.focus();
      });
    }
  };

  return (
    <div className="editable-page">
      {blocks.map((block) => (
        <EditableBlock
          key={block.id}
          id={block.id}
          tag={block.tag}
          html={block.html}
          updatePage={updatePageHandler}
          addBlock={addBlockHandler}
          deleteBlock={deleteBlockHandler}
        />
      ))}
    </div>
  );
};

export default EditablePage;
