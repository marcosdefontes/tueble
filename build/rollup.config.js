
import path from 'path';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import vue from 'rollup-plugin-vue';
import { terser } from "rollup-plugin-terser";

const extensions = [
   '.js', '.jsx', '.ts', '.tsx',
];

const resolve = _path => path.resolve(__dirname, '../', _path)
const basename = 'tueble';

/**
 * Configs' array
 */
export default [
   {
      extension: 'js',
      format: 'umd',
      env: 'development',
   },
   {
      extension: 'min.js',
      format: 'umd',
      env: 'production',
      minify: true,
   },
   {
      extension: 'common.js',
      format: 'cjs',
      env: 'production',
   },
   {
      extension: 'esm.js',
      format: 'es',
      env: 'production',
   },
   {
      extension: 'esm.browser.js',
      format: 'es',
      env: 'development',
      transpile: false
   },
   {
      extension: 'esm.browser.min.js',
      format: 'es',
      env: 'production',
      transpile: false,
      minify: true,
   }
].map(genConfig);


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

   // Adds env property to the beginning of config
   if (opts.env) {
      config.plugins.unshift(replace({
         'process.env.NODE_ENV': JSON.stringify(opts.env)
      }))
   }

   //If minify use terser to minify the code
   if (opts.minify === true) {
      config.plugins.push(terser({
         toplevel: true
      }))
   }

   // If the file needs to be transpiled, appy the babel plugin
   if (opts.transpile !== false) {
      babel({ extensions, include: ['src/**//*'] })
   }

   return config
}
