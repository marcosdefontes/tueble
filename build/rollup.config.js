
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import path from 'path';
import replace from 'rollup-plugin-replace';
import { terser } from "rollup-plugin-terser";
import vue from 'rollup-plugin-vue';

const basename = 'tueble';
const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const resolve = _path => path.resolve(__dirname, '../', _path)
const version = process.env.VERSION || require('../package.json').version

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
      format: 'iife',
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
         // Convert CommonJS modules to ES6, so they can be included in a Rollup bundle
         commonjs(),
         vue({
            // Inject CSS in JavaScript
            css: true,
            template: {
               isProduction: true,
            },
         }),
         // Show file sizes
         filesize({
            showGzippedSize: true,
            showMinifiedSize: false
         })
      ],
      output: {
         file: resolve('dist/' + basename + '.' + opts.extension),
         format: opts.format,
         name: 'Tueble',
         exports: 'named',
         banner: `/*!\n* tueble v${version}\n* (c) ${new Date().getFullYear()} Marcos Freire\n* @license MIT\n*/`
      },
   }

   // Adds env property to the beginning of config
   if (opts.env) {
      config.plugins.unshift(replace({
         'process.env.NODE_ENV': JSON.stringify(opts.env)
      }))
   }

   // If the file needs to be transpiled, appy the babel plugin
   if (opts.transpile !== false) {
      config.plugins.push(babel({ extensions, include: ['src/**/*'] }))
   }

   //If minify use terser to minify the code
   if (opts.minify === true) {
      config.plugins.push(terser({
         toplevel: true,
         output: {
            comments: 'some'
         }
      }))
   }


   return config
}
