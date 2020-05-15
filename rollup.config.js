import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default {
  input: './src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs'
    },
    {
      file: pkg.module,
      format: 'es'
    }
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ],
  plugins: [
    typescript({
      tsconfig: 'tsconfig.json',
      typescript: require('typescript')
    })
  ],
  onwarn(warning, warn) {
    if (warning.code === 'THIS_IS_UNDEFINED') return;
    warn(warning); // this requires Rollup 0.46
  }
};