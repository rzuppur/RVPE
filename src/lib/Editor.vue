<template lang="pug">

.editor
  h3 tere
  .editor-content(ref="editorContainer")
  pre {{ jsonContent }}
  pre {{ marksInSelection }}
  pre {{ nodesInSelection }}

</template>

<script lang="ts">

import {defineComponent, onMounted, ref, Ref, watch} from "vue";
import {EditorView} from "prosemirror-view";
import {findSelectedNodeOfType} from "prosemirror-utils";

import {schema} from "./schema";
import {createState} from "./state";

export default defineComponent({
  name: "Editor",
  props: {
    modelValue: Object,
  },
  emits: ["update:modelValue"],
  setup(props, {emit}) {
    const jsonContent = ref(props.modelValue);
    let state = createState(jsonContent.value as JSON);

    const editorContainer = ref(null);

    let view: EditorView;
    let marksInSelection: Ref<String[]> = ref([]);
    let nodesInSelection: Ref<String[]> = ref([]);

    onMounted(() => {
      if (!editorContainer.value) throw new Error("No element to mount editor to");

      view = new EditorView(editorContainer.value as unknown as Node, {
        state,
        dispatchTransaction(transaction) {
          const newState = view.state.apply(transaction);
          view.updateState(newState);

          marksInSelection.value = [];
          nodesInSelection.value = [];

          const {from, $from, to, empty} = view.state.selection;

          Object.entries(schema.marks).forEach(([markName, mark]) => {
            if (empty) {
              if (mark.isInSet(view.state.storedMarks || $from.marks())) {
                marksInSelection.value.push(markName);
              }
            }
            if (view.state.doc.rangeHasMark(from, to, mark)) {
              marksInSelection.value.push(markName);
            }
          });


          Object.entries(schema.nodes).forEach(([nodeName, nodeType]) => {
            const node = findSelectedNodeOfType(nodeType)(view.state.selection);
            if (node && node.node.type.name === nodeName) {
              nodesInSelection.value.push(nodeName);
            }

            for (let i = $from.depth; i > 0; i -= 1) {
              const n = $from.node(i);
              if (n.type === nodeType) {
                nodesInSelection.value.push(nodeName);
              }
            }
          });

          if (transaction.before.content.findDiffStart(transaction.doc.content) !== null) {
            jsonContent.value = transaction.doc.toJSON();
          }
        },
      });
    });

    watch(() => props.modelValue, (newContent) => {
      if (JSON.stringify(newContent) === JSON.stringify(view.state.doc.toJSON())) {
        return; // Content is identical
      }

      state = createState(newContent as JSON);
      if (view) view.updateState(state);
    });

    watch(() => jsonContent.value, () => {
      emit("update:modelValue", jsonContent.value);
    });

    return {
      editorContainer,
      jsonContent,
      marksInSelection,
      nodesInSelection,
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
