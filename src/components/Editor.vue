<template lang="pug">

.editor
  h3 tere
  pre active: {{ marksInSelection }}
  .editor-content(ref="editorContainer")

</template>
<script>

  import { defineComponent, onMounted, ref, watch } from "vue";
  import { EditorView } from "prosemirror-view";
  import { findParentNode, findSelectedNodeOfType } from "prosemirror-utils";

  import { schema } from "@/schema";
  import { createState } from "@/editor/state";

  export default defineComponent({
    name: "Editor",
    props: {
      content: JSON,
    },
    emits: ["changed"],
    setup(props, { emit }) {
      const jsonContent = ref(props.content);

      let state = createState(jsonContent.value);

      const editorContainer = ref(null);
      let view;
      let marksInSelection = ref([]);
      let nodesInSelection = ref([]);

      onMounted(() => {
        if (!editorContainer.value) throw new Error("No element to mount editor to");
        view = new EditorView(editorContainer.value, {
          state,
          dispatchTransaction(transaction) {
            const newState = view.state.apply(transaction);
            view.updateState(newState);

            marksInSelection.value = [];
            nodesInSelection.value = [];

            const { from, $from, to, empty } = view.state.selection;

            Object.entries(schema.marks).forEach(([name, mark]) => {
              if (empty) {
                if (mark.isInSet(view.state.storedMarks || $from.marks())) {
                  marksInSelection.value.push(name);
                }
              }
              if (view.state.doc.rangeHasMark(from, to, mark)) {
                marksInSelection.value.push(name);
              }
            });



            Object.entries(schema.nodes).forEach(([name, node]) => {
              const n = findSelectedNodeOfType(node)(view.state.selection);
              console.log(n);
            });

            /*
            if (transaction.before.content.findDiffStart(transaction.doc.content) !== null) {
              jsonContent.value = transaction.doc.toJSON();
            }
            */
          },
        });
      });

      watch(() => props.content, (newContent) => {
        if (JSON.stringify(newContent) === JSON.stringify(view.state.doc.toJSON())) {
          return; // Content is identical
        }
        state = createState(newContent);
        if (view) view.updateState(state);
      });

      watch(() => jsonContent.value, () => {
        emit("changed", jsonContent.value);
      });

      return {
        editorContainer,
        jsonContent,
        marksInSelection,
      };
    },
  });

</script>

<style lang="stylus">

  .ProseMirror
    position relative
    outline none
    word-wrap break-word
    white-space break-spaces
    -webkit-font-variant-ligatures none
    font-variant-ligatures none
    font-feature-settings "liga" 0
    border 1px solid red

  .ProseMirror-selectednode
    outline 2px solid #8cf

  .ProseMirror-gapcursor
    display none
    pointer-events none
    position absolute

  .ProseMirror-gapcursor:after
    content ""
    display block
    position absolute
    top -2px
    width 20px
    border-top 1px solid black
    animation ProseMirror-cursor-blink 1.1s steps(2, start) infinite

  @keyframes ProseMirror-cursor-blink
    to
      visibility hidden

  .ProseMirror-focused
    .ProseMirror-gapcursor
      display block

  .ProseMirror-prompt
    position fixed
    z-index 10

  .ProseMirror-prompt-close
    position absolute
    left 2px
    top 2px

  .ProseMirror-invalid
    background #fbb
    position absolute

</style>
