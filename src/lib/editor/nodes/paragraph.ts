import { DOMOutputSpecArray } from "prosemirror-model";

import { BaseNode } from "./baseNode";

export default class Paragraph extends BaseNode {
  get name() {
    return "paragraph";
  }

  get schema() {
    return {
      content: "inline*",
      group: "block",
      selectable: false,
      parseDOM: [{ tag: "p" }],
      toDOM: () => ["p", 0] as DOMOutputSpecArray,
    };
  }
}