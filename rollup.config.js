import * as packageJson from './package.json';

const info = `/*
 * ${packageJson.name}
 * Version ${packageJson.version}
 * ${packageJson.homepage}
 */
`;

export default {
  input: 'src/index.js',
  output: {
    name: 'ClickOut',
    file: 'dist/clickout.js',
    format: 'umd',
    exports: 'named',
    banner: info,
  }
};