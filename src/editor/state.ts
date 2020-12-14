import { EditorState } from "prosemirror-state";
import { DOMParser } from "prosemirror-model";
import { baseKeymap } from "prosemirror-commands";
import { keymap } from "prosemirror-keymap";
import { history } from "prosemirror-history";
import { dropCursor } from "prosemirror-dropcursor"; // Causes a decoration to show up at the drop position when something is dragged over the editor

import { emptyDocument, keyMap, schema } from "@/schema";

export const createDocument = (content?: JSON | string) => {
  if (typeof content === "object") {
    try {
      return schema.nodeFromJSON(content);
    } catch (error) {
      console.warn("rvpe: Invalid content.", "Content:", content, "Error:", error);
      return schema.nodeFromJSON(emptyDocument);
    }
  }

  if (typeof content === "string") {
    const htmlString = `<div>${content}</div>`;
    const parser = new window.DOMParser();
    const element = parser.parseFromString(htmlString, "text/html").body.firstElementChild;
    return DOMParser.fromSchema(schema).parse(element as Node);
  }

  return schema.nodeFromJSON(emptyDocument);
};

export const createState = (content?: JSON | string) => EditorState.create({
  schema,
  doc: createDocument(content),
  plugins: [
    keymap(keyMap),
    keymap(baseKeymap),
    // @ts-ignore
    dropCursor({ class: "rvpe-dropcursor" }),
    history(),
  ],
});
