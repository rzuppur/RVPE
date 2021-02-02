import {setBlockType, wrapIn, lift, Command} from "prosemirror-commands";
import {findParentNode, findSelectedNodeOfType} from "prosemirror-utils";
import {EditorState, Transaction} from "prosemirror-state";
import {Node as ProsemirrorNode, NodeType} from "prosemirror-model";

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