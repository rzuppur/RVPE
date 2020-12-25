import {setBlockType} from "prosemirror-commands";
import {findParentNode, findSelectedNodeOfType} from "prosemirror-utils";
import {EditorState, Transaction} from "prosemirror-state";
import {Node as ProsemirrorNode, NodeType} from "prosemirror-model";

export function nodeIsActive(state: EditorState, type: NodeType) {
    const predicate = (node: ProsemirrorNode) => node.type === type;
    const node = findSelectedNodeOfType(type)(state.selection)
        || findParentNode(predicate)(state.selection);

    if (node) {
        return node.node.hasMarkup(type, node.node.attrs);
    }
}

export function toggleNodeType(type: NodeType, toggleType: NodeType): (state: EditorState, dispatch: (tr: Transaction) => void) => boolean {
    return (state: EditorState, dispatch: (tr: Transaction) => void) => {
        const isActive = nodeIsActive(state, type)

        if (isActive) {
            return setBlockType(toggleType)(state, dispatch);
        }

        return setBlockType(type)(state, dispatch);
    };
}