<template lang="pug">

.editor
  .editor-content(ref="editorContainer")

</template>

<script lang="ts">

import { defineComponent, onMounted, ref, watch } from "vue";

import Editor from "./editor";

export default defineComponent({
  name: "Editor",
  props: {
    modelValue: Object,
  },
  emits: ["update:modelValue", "commands"],
  setup(props, { emit }) {
    const editorContainer = ref(null);
    const jsonContent = ref(props.modelValue);

    const editor = new Editor(jsonContent.value as JSON);
    editor.onContentChange = (newContent: JSON) => {
      jsonContent.value = newContent;
    };

    //emit("commands", commands);

    onMounted(() => {
      if (!editorContainer.value) throw new Error("No element to mount editor to");
      editor.mount(editorContainer.value as unknown as Node);
    });

    watch(() => props.modelValue, (newContent) => {
      editor.setContent(newContent as JSON || {});
    });

    watch(() => jsonContent.value, () => {
      emit("update:modelValue", jsonContent.value);
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
