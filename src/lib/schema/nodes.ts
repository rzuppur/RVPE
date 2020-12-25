import { NodeSpec } from "prosemirror-model";

const nodes: { [key: string]: NodeSpec } = {
  doc: {
    content: "block+",
  },
  paragraph: {
    content: "inline*",
    group: "block",
    selectable: false,
    parseDOM: [{ tag: "p" }],
    toDOM: () => ["p", 0],
  },
  blockquote: {
    content: "(paragraph | heading)+",
    group: "block",
    selectable: false,
    defining: true,
    parseDOM: [{ tag: "blockquote" }],
    toDOM: () => ["blockquote", 0],
  },
  heading: {
    content: "inline*",
    marks: "",
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
    toDOM: () => ["h1", { class: "rvpe-heading" }, 0],
  },
  hard_break: {
    inline: true,
    group: "inline",
    selectable: false,
    parseDOM: [{ tag: "br" }],
    toDOM: () => ["br"],
  },
  text: {
    group: "inline",
  },
};

export default nodes;