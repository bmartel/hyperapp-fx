import { terser } from "rollup-plugin-terser"

export default {
  plugins: [
    terser({
      mangle: {
        properties: {
          builtins: true,
          keep_quoted: true
        }
      }
    })
  ],
  input: "src/index.js",
  output: [
    {
      file: "dist/hyperappFx.js",
      format: "umd",
      name: "hyperappFx"
    }
  ]
}
