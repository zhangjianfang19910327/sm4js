// rollup.config.js
import babel from 'rollup-plugin-babel';
// import resolve from '@rollup/plugin-node-resolve';
export default {
    input: 'index.js',
    output: {
      file: 'sm4js.js',
      name:"Sm4js",
      banner:"/*\r\n  by zjf(npm:xishangrucai) \r\n To contact me:13691460209@163.com \r\n*/",
      format: 'umd'
    },
    plugins: [
      // resolve(),
      babel({
        // exclude: 'node_modules/**' // 只编译我们的源代码
      })
    ]
  };