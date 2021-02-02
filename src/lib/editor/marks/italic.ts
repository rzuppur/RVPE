import { DOMOutputSpecArray, ParseRule, Schema } from "prosemirror-model";
import { toggleMark } from "prosemirror-commands";

import { BaseMark } from "./baseMark";

export default class Italic extends BaseMark {
  get name() {
    return "italic";
  }

  get schema() {
    return {
      parseDOM: [
        { tag: "i" },
        { tag: "em" },
        { style: "font-style=italic" },
      ] as ParseRule[],
      toDOM: () => ["i", 0] as DOMOutputSpecArray,
    }
  }

  get keymaps() {
    return ["Mod-i", "Mod-I"];
  }

  getCommand(schema: Schema) {
    return toggleMark(schema.marks.italic);
  }

  get inToolbar() {
    return true;
  }
}
