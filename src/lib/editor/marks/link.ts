/*

{
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
};
*/