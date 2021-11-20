const path = require('path');

const clientRoot = path.resolve(__dirname, '../');
const appRoot = path.resolve(clientRoot, 'src');

module.exports = {
  clientRoot,
  appEntry: path.resolve(appRoot, 'index.tsx'),
  distPath: path.resolve(clientRoot, 'dist'),
  indexHtml: path.resolve(appRoot, 'assets/index.html'),
  assets: path.resolve(appRoot, 'assets')
};