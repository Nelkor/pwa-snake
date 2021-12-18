import { resolve } from 'path'

import HtmlPlugin from 'html-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import MiniCssPlugin from 'mini-css-extract-plugin'

import { alias } from './dev-helpers/alias'

export default {
  mode: 'production',
  entry: {
    app: resolve('src/app/main.ts'),
    sw: resolve('src/service-worker/sw.ts'),
  },
  output: {
    filename: '[name].js',
    clean: true,
  },
  resolve: {
    alias,
    extensions: ['.js', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: ['@babel/preset-typescript'],
        },
      },
      {
        test: /\.s[ac]ss$/,
        use: [MiniCssPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(woff2|jpg|png|webp|svg)$/,
        type: 'asset',
      },
    ],
  },
  plugins: [
    new MiniCssPlugin({ filename: 'bundle.css' }),
    new HtmlPlugin({ template: resolve('src/app/index.html') }),
    new CopyPlugin({ patterns: [{ from: 'static' }] }),
  ],
}
