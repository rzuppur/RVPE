import type { DOMOutputSpec, Schema } from "prosemirror-model";

import { BaseNode } from "./baseNode";
import { toggleNodeType } from "../utils";

export default class Blockquote extends BaseNode {
  get name() {
    return "blockquote";
  }

  get schema() {
    return {
      content: "inline*",
      group: "block",
      selectable: false,
      defining: true,
      parseDOM: [{ tag: "blockquote" }],
      toDOM: () => ["blockquote", 0] as DOMOutputSpec,
    };
  }

  get keymaps() {
    return ["Mod-Alt-b", "Mod-Alt-B"];
  }

  get inToolbar() {
    return true;
  }

  getCommand(schema: Schema) {
    return toggleNodeType(schema.nodes.blockquote, schema.nodes.paragraph);
  }
}
