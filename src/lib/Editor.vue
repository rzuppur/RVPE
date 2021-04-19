<template lang="pug">

.editor
  .editor-content(ref="editorContainer")

</template>

<script lang="ts">

import { defineComponent, onMounted, onUnmounted, ref, watch } from "vue";
import Editor, { ToolbarEntry } from "./editor/index";

export default defineComponent({
  name: "Editor",
  props: {
    modelValue: Object,
  },
  emits: ["update:modelValue", "toolbar"],
  setup(props, { emit }) {
    const editor = new Editor(props.modelValue as JSON);
    editor.onContentChange = (newContent: JSON) => {
      emit("update:modelValue", newContent);
    };
    editor.onToolbarChange = (newToolbar: ToolbarEntry[]) => {
      emit("toolbar", newToolbar);
    };

    const editorContainer = ref(null);
    onMounted(() => {
      if (!editorContainer.value) throw new Error("No element to mount editor to");
      editor.mount(editorContainer.value as unknown as Node);
    });

    onUnmounted(() => {
      editor.destroy();
    });

    watch(() => props.modelValue, (newContent) => {
      editor.setContent(newContent as JSON);
    });

    return {
      editorContainer,
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
