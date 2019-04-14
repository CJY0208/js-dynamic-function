import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'

const name = 'DynamicFunction'

export default [
  {
    input: 'src/index.js',
    output: {
      name,
      file: 'dist/index.min.js',
      format: 'umd'
    },
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**'
      }),
      uglify()
    ]
  },
  {
    input: 'src/index.js',
    output: {
      name,
      file: 'dist/index.js',
      format: 'umd'
    },
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**'
      })
    ]
  }
]
