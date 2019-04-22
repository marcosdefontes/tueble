
import path from 'path';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import vue from 'rollup-plugin-vue';

const extensions = [
  '.js', '.jsx', '.ts', '.tsx',
];

const resolve = _path => path.resolve(__dirname, '../', _path)
const basename = 'tueble';

export default [{
  extension: 'js',
  format: 'umd',
  env: 'development',
  name: 'Tueble',
  exports: 'named',
}].map(genConfig);


function genConfig(opts) {
  const config = {
    input: resolve('src/entry.js'),

    plugins: [

      commonjs(),
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
    ],
    output: {
      file: resolve('dist/' + basename + '.' + opts.extension),
      format: 'umd',
      name: 'Tueble',
      exports: 'named'
    },
  }

  if (opts.env) {
    config.plugins.unshift(replace({
      'process.env.NODE_ENV': JSON.stringify(opts.env)
    }))
  }

  if (opts.transpile !== false) {
    babel({ extensions, include: ['src/**//*'] })
  }

  return config
}
