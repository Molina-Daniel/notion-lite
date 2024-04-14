import { nanoid } from "nanoid";
import { BasicNode } from "../Node/BasicNode";
import { useAppState } from "../state/AppStateContext";
import { useFocusedNodeIndex } from "./useFocusedNodeIndex";
import { Cover } from "./Cover";
import { Spacer } from "./Spacer";
import { Title } from "./Title";

export const Page = () => {
  const { addNode, nodes, title, setTitle } = useAppState();
  const [focusedNodeIndex, setFocusedNodeIndex] = useFocusedNodeIndex({
    nodes,
  });

  return (
    <>
      <Cover />
      <div>
        <Title addNode={addNode} title={title} changePageTitle={setTitle} />
        {nodes.map((node, index) => (
          <BasicNode
            key={node.id}
            node={node}
            isFocused={focusedNodeIndex === index}
            updateFocusedIndex={setFocusedNodeIndex}
            index={index}
          />
        ))}
        <Spacer
          handleClick={() =>
            addNode({ type: "text", value: "", id: nanoid() }, nodes.length)
          }
          showHint={!nodes.length}
        />
      </div>
    </>
  );
};
