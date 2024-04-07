import { useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import { NodeData } from "../utils/types";
import styles from "./Title.module.css";

type TitleProps = {
  title: string;
  changeTitle(title: string): void;
  addNode(node: NodeData, index: number): void;
};

export const Title = ({ title, changeTitle, addNode }: TitleProps) => {
  const headerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const isFocused = document.activeElement == headerRef.current;
    if (!isFocused && headerRef.current) {
      headerRef.current.textContent = title;
    }
  }, []);

  return (
    <div className={styles.container}>
      <h1
        className={styles.title}
        contentEditable
        suppressContentEditableWarning
        onInput={(event) => changeTitle(event.currentTarget.textContent || "")}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            addNode({ id: nanoid(), type: "text", value: "" }, 0);
          }
        }}
      >
        {title}
      </h1>
      <button onClick={() => changeTitle("New Title")}>Change Title</button>
      <button
        onClick={() => addNode({ id: "1", type: "text", value: "New Node" }, 0)}
      >
        Add Node
      </button>
    </div>
  );
};
