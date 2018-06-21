'use strict'
require('./check-versions')()

let staging = false;

process.argv.slice(2).forEach(function(val, index) {
  if(val === "--staging-build") {
    staging = true;
  }
});

process.env.NODE_ENV = staging ? 'staging' : 'production';

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
let webpackConfig = require('./webpack.prod.conf')

if(staging) {
  webpackConfig = require('./webpack.staging.conf')
} else {
  webpackConfig = require('./webpack.prod.conf')
}

const spinner = require('./spinner')(process.env.NODE_ENV);

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
