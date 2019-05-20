import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import pkg from './package.json'

export default {
  input: 'src/index.js',
  output: [
    { file: pkg.main, format: 'cjs', sourcemap: true },
    { file: pkg.module, format: 'es', sourcemap: true }
  ],
  plugins: [
    resolve(),
    babel({
      babelrc: false,
      exclude: ['node_modules/**'],
      plugins: [
        ['@babel/plugin-proposal-class-properties', { loose: false }],
        ['@babel/plugin-proposal-object-rest-spread']
      ],
      presets: [
        ['@babel/react'],
        ['@babel/env', { modules: false }],
      ]
    }),
    commonjs()
  ],
  external: [
    'immer',
    'react',
    'react-dom'
  ]
}