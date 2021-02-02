import { BaseNode } from "./baseNode";

export default class Text extends BaseNode {
  get name() {
    return "text";
  }

  get schema() {
    return {
      group: "inline",
    };
  }
}