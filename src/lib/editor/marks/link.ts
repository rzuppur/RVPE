import { DOMOutputSpecArray, ParseRule, Schema } from "prosemirror-model";
import { toggleMark } from "prosemirror-commands";

import { BaseMark } from "./baseMark";

export default class Link extends BaseMark {
    get name() {
        return "link";
    }

    get schema() {
        return {
            attrs: {
                href: { default: null },
            },
            parseDOM: [
                {
                    tag: "a[href]",
                    getAttrs: (dom) => ({
                        // @ts-ignore
                        href: dom.getAttribute("href"),
                    }),
                },
            ] as ParseRule[],
            toDOM: (node) => {
                return ["a", { href: node.attrs.href, rel: "noopener noreferrer nofollow", target: "_blank" }, 0] as DOMOutputSpecArray;
            },
        }
    }

    getCommand(schema: Schema) {
        return toggleMark(schema.marks.link);
        /*
        addCommands() {
            return {
                setLink: attributes => ({ commands }) => {
                    return commands.setMark('link', attributes)
                },
                toggleLink: attributes => ({ commands }) => {
                    return commands.toggleMark('link', attributes)
                },
                unsetLink: () => ({ commands }) => {
                    return commands.unsetMark('link')
                },
            }
        },
         */
    }

    get inToolbar() {
        return true;
    }
}
