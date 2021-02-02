import { MarkSpec, Schema } from "prosemirror-model";
import { Command } from "prosemirror-commands";

export class BaseMark {
  get name(): string {
    /**
     * Name used in schema and in toolbar commands
     */
    return "";
  }

  get schema(): MarkSpec {
    /**
     * Prosemirror schema
     */
    return {};
  }

  get keymaps(): string[] {
    /**
     * Key combinations to run the command on
     */
    return [];
  }

  get inToolbar(): boolean {
    /**
     * Makes command available for toolbar
     */
    return false;
  }

  getCommand(schema: Schema): Command {
    /**
     * Prosemirror command to toggle the mark
     */
    return () => true;
  }
}