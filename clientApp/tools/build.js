const Webpack = require('webpack');
const fs = require('fs');

const config = require('./webpack.prod.config');
const paths = require('./paths');

const compiler = Webpack(config);

// Remove prev dist
if (fs.existsSync(paths.distPath))
  fs.rmSync(paths.distPath, { recursive: true });

compiler.run((err, stats) => {
  if (err) console.error(err);
  else console.log(stats);
});