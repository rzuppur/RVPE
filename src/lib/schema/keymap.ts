import { Schema } from "prosemirror-model";
import { EditorState, Transaction } from "prosemirror-state";
import { toggleMark, selectParentNode } from "prosemirror-commands";
import { undo, redo } from "prosemirror-history";
import { undoInputRule } from "prosemirror-inputrules";
import { toggleNodeType } from "./utils";

type keyBindFn = (state: EditorState, dispatch: (tr: Transaction) => void) => boolean;

function bindKeys(schema: Schema) {

  const keymap: { [key: string]: keyBindFn } = {};

  const bindKey = (key: string, cmd: keyBindFn) => {
    keymap[key] = cmd;
  };

  bindKey("Mod-z", undo);
  bindKey("Shift-Mod-z", redo);

  bindKey("Backspace", undoInputRule);
  if (typeof navigator === "undefined" || !(/Mac/.test(navigator.platform))) bindKey("Mod-y", redo);

  bindKey("Escape", selectParentNode);

  bindKey("Mod-b", toggleMark(schema.marks.bold));
  bindKey("Mod-B", toggleMark(schema.marks.bold));

  bindKey("Mod-i", toggleMark(schema.marks.italic));
  bindKey("Mod-I", toggleMark(schema.marks.italic));

  bindKey("Mod-Alt-t", toggleNodeType(schema.nodes.heading, schema.nodes.paragraph));
  bindKey("Mod-Alt-T", toggleNodeType(schema.nodes.heading, schema.nodes.paragraph));

  bindKey("Shift-Enter", (state, dispatch) => {
    if (!dispatch) return false;
    dispatch(state.tr.replaceSelectionWith(schema.nodes.hard_break.create()).scrollIntoView());
    return true;
  });

  return keymap;
}

export default bindKeys;