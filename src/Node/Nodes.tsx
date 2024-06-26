import {
  FormEventHandler,
  KeyboardEventHandler,
  useEffect,
  useRef,
} from "react";
import { nanoid } from "nanoid";
import cx from "classnames";
import { NodeData, NodeType } from "../utils/types";
import { useAppState } from "../state/AppStateContext";
import styles from "./Nodes.module.css";
import { CommandPannel } from "./CommandPanel";

type NodesProps = {
  node: NodeData;
  updateFocusedIndex(index: number): void;
  isFocused: boolean;
  index: number;
};

export const Nodes = ({
  node,
  updateFocusedIndex,
  isFocused,
  index,
}: NodesProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const showCommandPanel = isFocused && node.value[0] === "/";

  const { addNode, changeNodeValue, changeNodeType, removeNodeByIndex } =
    useAppState();

  useEffect(() => {
    if (isFocused) {
      nodeRef.current?.focus();
    } else {
      nodeRef.current?.blur();
    }
  }, [isFocused]);

  useEffect(() => {
    if (nodeRef.current && !isFocused) {
      nodeRef.current.textContent = node.value;
    }
  }, [node]);

  const parseCommand = (nodeType: NodeType) => {
    if (nodeRef.current) {
      changeNodeType(index, nodeType);
      nodeRef.current.textContent = "";
    }
  };

  const handleInput: FormEventHandler<HTMLDivElement> = ({ currentTarget }) => {
    const { textContent } = currentTarget;
    changeNodeValue(index, textContent || "");
  };

  const handleClick = () => {
    updateFocusedIndex(index);
  };

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    const target = event.target as HTMLDivElement;

    if (event.key === "Enter") {
      event.preventDefault();
      if (target.textContent?.[0] === "/") {
        return;
      }
      addNode({ type: node.type, value: "", id: nanoid() }, index + 1);
      updateFocusedIndex(index + 1);
    }

    if (event.key === "Backspace") {
      if (target.textContent?.length === 0) {
        event.preventDefault();
        removeNodeByIndex(index);
        updateFocusedIndex(index - 1);
      } else if (window.getSelection()?.anchorOffset === 0) {
        event.preventDefault();
        removeNodeByIndex(index - 1);
        updateFocusedIndex(index - 1);
      }
    }
  };

  return (
    <>
      {showCommandPanel && (
        <CommandPannel selectItem={parseCommand} nodeText={node.value} />
      )}
      <div
        onInput={handleInput}
        onClick={handleClick}
        onKeyDown={onKeyDown}
        ref={nodeRef}
        contentEditable
        suppressContentEditableWarning
        className={cx(styles.node, styles[node.type])}
      />
    </>
  );
};
