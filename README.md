# RVPE

Minimal rich text editor for Vue 3 based on [ProseMirror](https://prosemirror.net/).

## Usage
Install: `yarn add @rzuppur/rvpe`

Use in Vue component:

```vue
<template>
  <button v-for="b in toolbar" :style="{'font-weight': b.active ? 700 : 400}" @click="b.command">
      {{ b.name }}
  </button>
  <editor v-model="editorJson" @toolbar="setToolbar"></editor>
</template>

<script lang="ts">
  import {defineComponent} from "vue";
  import Editor, {emptyDocument} from "@rzuppur/rvpe";

  export default defineComponent({
    data() {
      return {
        editorJson: emptyDocument,
        toolbar: [],
      };
    },
    components: { Editor },
    methods: {
      setToolbar(toolbar: any) {
        this.toolbar = toolbar;
      },
    },
  });
</script>
```
