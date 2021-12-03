const Webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk').default;
const { EOL } = require('os');

const config = require('./webpack.prod.config');
const paths = require('./paths');

const compiler = Webpack(config);

// Remove prev dist
if (fs.existsSync(paths.distPath))
  fs.rmSync(paths.distPath, { recursive: true });

const bgRed = chalk.bgRed.white.bold;
const blue = chalk.blue;
const red = chalk.red;
const bgYellow = chalk.bgYellow.black.bold;
const white = chalk.white;
const orange = chalk.hex('#ffa500');
const green = chalk.green.bold;

const statsPath = path.resolve(__dirname, 'stats.json');

console.log(white.bold(`${EOL}Initing build...`));
compiler.run((err, stats) => {
  if (err) console.log(bgRed(err));
  else {
    console.log(green(`${EOL}Build done without critial errors, generated files: ${EOL}`));
    Object.keys(stats.compilation.assets).forEach(fileName => console.log(blue(`  - ${fileName}`)));

    if (stats.hasErrors()) {
      console.log(bgRed(`${EOL}${stats.compilation.errors.length} errors: ${EOL}`))
      for (const err of stats.compilation.errors)
        console.log(red(err.toString()));
    }

    if (stats.hasWarnings()) {
      console.log(bgYellow(`${EOL}${stats.compilation.warnings.length} warnings: ${EOL}`))
      for (const warning of stats.compilation.warnings)
        console.log(orange(warning.toString()));
    }

    fs.writeFileSync(statsPath, JSON.stringify(stats.toJson()));
    console.log(white(`${EOL}stats file written in ${path.relative(process.cwd(), statsPath)}`));
    console.log(green('DONE'));
  }
});