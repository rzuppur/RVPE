import { NodeSpec, Schema } from "prosemirror-model";
import { Command } from "prosemirror-commands";

export class BaseNode {
  /**
   * Indicates if node is active in current selection
   */
  public isActive: boolean = false;

  /**
   * Command for toggling the node in editor, returns true on success
   */
  public command?: () => boolean;

  /**
   * Name used in schema, for requirements and in toolbar commands
   */
  get name(): string {
    return "";
  }

  /**
   * Other node names this node depends on
   */
  get requirements(): string[] {
    return [];
  }

  /**
   * Prosemirror schema
   */
  get schema(): NodeSpec {
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
   * Prosemirror command to apply or toggle the node
   */
  getCommand(schema: Schema): Command {
    return () => true;
  }
}