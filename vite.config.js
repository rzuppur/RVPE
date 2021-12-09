import vue from "@vitejs/plugin-vue";

export default {
  plugins: [
    vue(),
  ],
  server: {
    port: 8081,
    open: true,
  }
};
