import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import banner2 from "rollup-plugin-banner2";
import copy from "rollup-plugin-copy";

const PRODUCTION_PLUGIN_CONFIG = {
  input: "src/main.ts",
  output: {
    dir: ".",
    sourcemap: "inline",
    sourcemapExcludeSources: true,
    format: "cjs",
    exports: "default",
  },
  external: ["obsidian"],
  plugins: [
    typescript(),
    nodeResolve({ browser: true }),
    commonjs(),
    banner2(() => `/* This is the generated code */`),
  ],
};

const DEV_PLUGIN_CONFIG = {
  input: "src/main.ts",
  output: {
    dir: "D:\\noteStorage\\sandbox\\Sandbox\\.obsidian\\plugins\\obsidian-demo-plugin",
    sourcemap: "inline",
    sourcemapExcludeSources: true,
    format: "cjs",
    exports: "default",
  },
  external: ["obsidian"],
  plugins: [
    typescript(),
    nodeResolve({ browser: true }),
    commonjs(),
    banner2(() => `/* This is the generated code */`),
    copy({
      targets: [
        {
          src: "manifest.json",
          dest: "D:\\noteStorage\\sandbox\\Sandbox\\.obsidian\\plugins\\obsidian-demo-plugin",
        },
      ], // 路径
      hook: "writeBundle", // 钩子，插件运行在rollup完成打包并将文件写入磁盘之前
      verbose: true, // 在终端进行console.log
    }),
  ],
};

let configs = [];

if (process.env.BUILD === "dev") {
  configs.push(DEV_PLUGIN_CONFIG);
} else if (process.env.BUILD === "production") {
  configs.push(PRODUCTION_PLUGIN_CONFIG);
} else {
  configs.push(DEV_PLUGIN_CONFIG);
}

export default configs;
