const path = require('path')
const babel = require('rollup-plugin-babel');
const buble = require('rollup-plugin-buble')
const cjs = require('rollup-plugin-commonjs')
const node = require('rollup-plugin-node-resolve')
const replace = require('rollup-plugin-replace')
const vue = require ('rollup-plugin-vue');
const version = process.env.VERSION || require('../package.json').version
const banner =
`/*!
  * tueble v${version}
  * (c) ${new Date().getFullYear()} Marcos Freire
  * @license MIT
  */`

const resolve = _path => path.resolve(__dirname, '../', _path)
const basename = 'tueble';

const extensions = [
  '.js', '.jsx', '.ts', '.tsx',
];

module.exports = [
  // browser dev
  {
    file: resolve('dist/' + basename + '.js'),
    format: 'umd',
    env: 'development'
  },
  {
    file: resolve('dist/' + basename + '.min.js'),
    format: 'umd',
    env: 'production'
  },
  {
    file: resolve('dist/' + basename + '.common.js'),
    format: 'cjs'
  },
  {
    file: resolve('dist/' + basename + '.esm.js'),
    format: 'es'
  },
  {
    file: resolve('dist/' + basename + '.esm.browser.js'),
    format: 'es',
    env: 'development',
    transpile: false
  },
  {
    file: resolve('dist/' + basename + '.esm.browser.min.js'),
    format: 'es',
    env: 'production',
    transpile: false
  }
].map(genConfig)

function genConfig (opts) {
  const config = {
    input: {
      input: resolve('src/entry.js'),
      plugins: [
        /* node(),
        cjs(),
        replace({
          __VERSION__: version
        }) */
        cjs(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    vue({
      css: true,
      compileTemplate: true,
      template: {
        isProduction: true,
      },
    }),
      ]
    },
    output: {
      file: opts.file,
      format: opts.format,
      banner,
      name: 'Tueble'
    }
  }

  if (opts.env) {
    config.input.plugins.unshift(replace({
      'process.env.NODE_ENV': JSON.stringify(opts.env)
    }))
  }

  if (opts.transpile !== false) {
    babel({ extensions, include: ['src/**/*'] })
  }

  return config
}