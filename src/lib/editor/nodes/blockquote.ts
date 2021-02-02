import { DOMOutputSpecArray, Schema } from "prosemirror-model";

import { BaseNode } from "./baseNode";
import { toggleWrapInNode } from "../utils";

export default class Blockquote extends BaseNode {
  get name() {
    return "blockquote";
  }

  get schema() {
    return {
      content: "block*",
      group: "block",
      selectable: false,
      defining: true,
      parseDOM: [{ tag: "blockquote" }],
      toDOM: () => ["blockquote", 0] as DOMOutputSpecArray,
    };
  }

  get keymaps() {
    return ["Mod-Alt-b", "Mod-Alt-B"];
  }

  get inToolbar() {
    return true;
  }

  getCommand(schema: Schema) {
    return toggleWrapInNode(schema.nodes.blockquote);
  }
}