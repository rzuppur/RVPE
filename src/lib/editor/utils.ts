import { setBlockType, wrapIn, lift } from "prosemirror-commands";
import { NodeSelection } from "prosemirror-state";
import type { EditorState, Transaction, Selection, Command } from "prosemirror-state";
import type { Node as ProsemirrorNode, NodeType, ResolvedPos } from "prosemirror-model";

type Predicate = (node: ProsemirrorNode) => boolean;
type ContentNodeWithPos = { pos: number, start: number, depth: number, node: ProsemirrorNode };

function equalNodeType(nodeType, node) {
  return (
    (Array.isArray(nodeType) && nodeType.indexOf(node.type) > -1) ||
    node.type === nodeType
  );
}

export function findParentNode(predicate: Predicate): (selection: Selection) => ContentNodeWithPos | undefined {
  return ({ $from }) => findParentNodeClosestToPos($from, predicate);
}

export function findParentNodeClosestToPos($pos: ResolvedPos, predicate: Predicate): ContentNodeWithPos | undefined {
  for (let i = $pos.depth; i > 0; i--) {
    const node = $pos.node(i);
    if (predicate(node)) {
      return {
        pos: i > 0 ? $pos.before(i) : 0,
        start: $pos.start(i),
        depth: i,
        node,
      };
    }
  }
}

export function findSelectedNodeOfType(nodeType: NodeType | NodeType[]): (selection: Selection) => ContentNodeWithPos | undefined {
  return (selection: Selection) => {
    if (selection instanceof NodeSelection) {
      // @ts-ignore
      const { node, $from, start } = selection;
      if (equalNodeType(nodeType, node)) {
        return { node, pos: $from.pos, depth: $from.depth, start };
      }
    }
  }
}

export function nodeIsActive(state: EditorState, type: NodeType): boolean {
  const predicate = (node: ProsemirrorNode) => node.type === type;
  const node = findSelectedNodeOfType(type)(state.selection)
    || findParentNode(predicate)(state.selection);

  if (node) {
    return node.node.hasMarkup(type, node.node.attrs);
  }

  return false;
}

export function toggleNodeType(type: NodeType, toggleType: NodeType): Command {
  return (state: EditorState, dispatch?: (tr: Transaction) => void) => {
    const isActive = nodeIsActive(state, type)

    if (isActive) {
      return setBlockType(toggleType)(state, dispatch);
    }

    return setBlockType(type)(state, dispatch);
  };
}

export function toggleWrapInNode(type: NodeType): Command {
  return (state: EditorState, dispatch?: (tr: Transaction) => void) => {
    const isActive = nodeIsActive(state, type)

    if (isActive) {
      return lift(state, dispatch);
    }

    return wrapIn(type)(state, dispatch);
  };
}
