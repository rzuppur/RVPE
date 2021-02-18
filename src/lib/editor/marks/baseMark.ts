import { MarkSpec, Schema } from "prosemirror-model";
import { Command } from "prosemirror-commands";

export class BaseMark {
  /**
   * Indicates if mark is active in current selection
   */
  public isActive: boolean = false;

  /**
   * Command for toggling the mark in editor, returns true on success
   */
  public command?: () => boolean;

  /**
   * Name used in schema and in toolbar commands
   */
  get name(): string {
    return "";
  }

  /**
   * Prosemirror schema
   */
  get schema(): MarkSpec {
    return {};
  }

  /**
   * Key combinations to run the command on
   */
  get keymaps(): string[] {
    return [];
  }

  /**
   * Makes command available for toolbar
   */
  get inToolbar(): boolean {
    return false;
  }

  /**
   * Prosemirror command to toggle the mark
   */
  getCommand(schema: Schema): Command {
    return () => true;
  }
}