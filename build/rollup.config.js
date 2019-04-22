
import babel  from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import minimist from 'minimist';
import replace from 'rollup-plugin-replace';
import vue from 'rollup-plugin-vue';

const extensions = [
  '.js', '.jsx', '.ts', '.tsx',
];

const argv = minimist(process.argv.slice(2));

const config = {
  // Entry file
  input: 'src/entry.js',
  output: {
    name: 'Tueble',
    exports: 'named',
  },
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

    // Compile TypeScript/JavaScript files
    babel({ extensions, include: ['src/**/*'] }),
  ],
};

// Only minify browser (iife) version
// if (argv.format === 'iife') {
//   config.plugins.push(uglify());
// }

export default config;