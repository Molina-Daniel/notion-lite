import { arrayMove } from "@dnd-kit/sortable";
import { NodeData, NodeType, Page } from "../utils/types";
import { updatePage } from "../utils/updatePage";
import { useSyncState } from "./useSyncState";

export const usePageState = (initialState: Page) => {
  const [page, setPage] = useSyncState(initialState, updatePage);

  const addNode = (node: NodeData, index: number) => {
    setPage((draft) => {
      draft.nodes.splice(index, 0, node);
    });
  };

  const removeNodeByIndex = (nodeIndex: number) => {
    setPage((draft) => {
      draft.nodes.splice(nodeIndex, 1);
    });
  };

  const changeNodeValue = (nodeIndex: number, value: string) => {
    setPage((draft) => {
      draft.nodes[nodeIndex].value = value;
    });
  };

  const changeNodeType = (nodeIndex: number, type: NodeType) => {
    setPage((draft) => {
      draft.nodes[nodeIndex].type = type;
      draft.nodes[nodeIndex].value = "";
    });
  };

  const setNodes = (nodes: NodeData[]) => {
    setPage((draft) => {
      draft.nodes = nodes;
    });
  };

  const setTitle = (title: string) => {
    setPage((draft) => {
      draft.title = title;
    });
  };

  const setCoverImage = (coverImage: string) => {
    setPage((draft) => {
      draft.cover = coverImage;
    });
  };

  const reorderNodes = (id1: string, id2: string) => {
    setPage((draft) => {
      const index1 = draft.nodes.findIndex((node) => node.id === id1);
      const index2 = draft.nodes.findIndex((node) => node.id === id2);
      draft.nodes = arrayMove(draft.nodes, index1, index2);
    });
  };

  return {
    cover: page.cover,
    nodes: page.nodes,
    title: page.title,
    addNode,
    changeNodeType,
    changeNodeValue,
    removeNodeByIndex,
    reorderNodes,
    setNodes,
    setTitle,
    setCoverImage,
  };
};
