import { Schema } from "prosemirror-model";

import nodes from "./nodes";
import marks from "./marks";
import bindKeys from "./keymap";

const topNode = "doc";

export const emptyDocument = {
  type: topNode,
  content: [{
    type: "paragraph",
  }],
};

export const schema = new Schema({ nodes, marks });
export const keyMap = bindKeys(schema);
