import { MarkSpec } from "prosemirror-model";

const marks: { [key: string]: MarkSpec } = {
  link: {
    attrs: {
      href: {},
      title: { default: null },
    },
    inclusive: false,
    parseDOM: [{
      tag: "a[href]",
      // @ts-ignore
      getAttrs: (dom) => ({ href: dom.getAttribute("href"), title: dom.getAttribute("title") }),
    }],
    toDOM: (node) => {
      const attrs = node.attrs;
      const href = attrs.href;
      const title = attrs.title;
      return ["a", { href, title, rel: "noopener noreferrer nofollow", target: "_blank" }, 0];
    },
  },
  italic: {
    parseDOM: [
      { tag: "i" },
      { tag: "em" },
      { style: "font-style=italic" },
    ],
    toDOM: () => ["i", 0],
  },
  bold: {
    parseDOM: [
      { tag: "strong" },
      // @ts-ignore
      { tag: "b", getAttrs: (node) => node.style.fontWeight !== "normal" },
      // @ts-ignore
      { style: "font-weight", getAttrs: (value) => /^(bold(er)?|[5-9]\d{2,})$/.test(value) },
    ],
    toDOM: () => ["b", 0],
  },
};

export default marks;