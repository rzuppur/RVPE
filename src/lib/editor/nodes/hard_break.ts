import { DOMOutputSpecArray, Schema } from "prosemirror-model";
import { EditorState, Transaction } from "prosemirror-state";

import { BaseNode } from "./baseNode";

export default class HardBreak extends BaseNode {
  get name() {
    return "hard_break";
  }

  get schema() {
    return {
      inline: true,
      group: "inline",
      selectable: false,
      parseDOM: [{ tag: "br" }],
      toDOM: () => ["br"] as DOMOutputSpecArray,
    };
  }

  get keymaps() {
    return ["Shift-Enter"];
  }

  getCommand(schema: Schema) {
    return ((state: EditorState, dispatch?: (tr: Transaction) => void) => {
      if (!dispatch) return false;
      dispatch(state.tr.replaceSelectionWith(schema.nodes.hard_break.create()).scrollIntoView());
      return true;
    });
  }
}