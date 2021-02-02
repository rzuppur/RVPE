import { BaseNode } from "./baseNode";

export default class Doc extends BaseNode {
  get name() {
    return "doc";
  }

  get schema() {
    return {
      content: "block+",
    };
  }
}