import {terser} from "rollup-plugin-terser";
import vuePlugin from "rollup-plugin-vue";
import postCssPlugin from "rollup-plugin-postcss";
import esbuildPlugin from "rollup-plugin-esbuild";

export default {
    input: "src/lib/Editor.vue",
    output: [{
        globals: {
            vue: "Vue"
        },
        name: "RVPE",
        file: "dist/lib/rvpe.js",
        format: "umd",
        plugins: [terser()]
    }, {
        name: "RVPE",
        file: "dist/lib/rvpe.esm.js",
        format: "es",
        plugins: [terser()],
    }],
    plugins: [
        vuePlugin({
            include: /\.vue$/,
            preprocessStyles: true,
        }),
        postCssPlugin({
            minimize: true,
        }),
        esbuildPlugin({
            include: /\.[jt]s$/,
            minify: process.env.NODE_ENV === "production",
            target: "es2015",
        }),
    ]
}