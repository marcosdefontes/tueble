
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

/**
 * Configs' array
 */
export default [{
   extension: 'js',
   format: 'umd',
   env: 'development',
}].map(genConfig);


/**
 * Apply common options to all configs
 * @param {*} opts Specific options for the config
 */
function genConfig(opts) {
   const config = {
      // The entry file
      input: resolve('src/entry.js'),

      plugins: [
         commonjs(),
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
         format: opts.format,
         name: 'Tueble',
         exports: 'named'
      },
   }

   if (opts.env) {
      // Adds env property to the beginning of config
      config.plugins.unshift(replace({
         'process.env.NODE_ENV': JSON.stringify(opts.env)
      }))
   }

   if (opts.transpile !== false) {
      // If the file needs to be transpiled, appy the babel plugin
      babel({ extensions, include: ['src/**//*'] })
   }

   return config
}
