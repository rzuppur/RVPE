import type { DOMOutputSpec, Schema } from "prosemirror-model";

import { BaseNode } from "./baseNode";
import { toggleNodeType } from "../utils";

export default class Heading extends BaseNode {
  get name() {
    return "heading";
  }

  get schema() {
    return {
      content: "inline*",
      marks: "italic",
      group: "block",
      selectable: false,
      defining: true,
      parseDOM: [
        { tag: "h1" },
        { tag: "h2" },
        { tag: "h3" },
        { tag: "h4" },
        { tag: "h5" },
        { tag: "h6" },
      ],
      toDOM: () => ["h1", { class: "rvpe-heading" }, 0] as DOMOutputSpec,
    };
  }

  get keymaps() {
    return ["Mod-Alt-t", "Mod-Alt-T"];
  }

  get inToolbar() {
    return true;
  }

  getCommand(schema: Schema) {
    return toggleNodeType(schema.nodes.heading, schema.nodes.paragraph);
  }
}
