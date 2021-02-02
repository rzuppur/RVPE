import { DOMOutputSpecArray, ParseRule, Schema } from "prosemirror-model";
import { toggleMark } from "prosemirror-commands";

import { BaseMark } from "./baseMark";

export default class Bold extends BaseMark {
  get name() {
    return "bold";
  }

  get schema() {
    return {
      parseDOM: [
        { tag: "strong" },
        { tag: "b", getAttrs: (node: HTMLElement) => node.style.fontWeight !== "normal" },
        { style: "font-weight", getAttrs: (value: string) => /^(bold(er)?|[5-9]\d{2,})$/.test(value) },
      ] as ParseRule[],
      toDOM: () => ["b", 0] as DOMOutputSpecArray,
    }
  }

  get keymaps() {
    return ["Mod-b", "Mod-B"];
  }

  getCommand(schema: Schema) {
    return toggleMark(schema.marks.bold);
  }

  get inToolbar() {
    return true;
  }
}
