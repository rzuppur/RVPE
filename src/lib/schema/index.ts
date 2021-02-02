import { Schema } from "prosemirror-model";
import { Keymap } from "prosemirror-commands";

import nodes from "./nodes";
import marks from "./marks";
import bindKeys from "./keymap";

export const emptyDocument = {
  type: "doc",
  content: [{
    type: "paragraph",
  }],
};

export const schema = new Schema({ nodes, marks });
export const keyMap = bindKeys(schema) as Keymap;
