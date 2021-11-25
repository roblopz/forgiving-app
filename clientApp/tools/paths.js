const path = require('path');

const clientRoot = path.resolve(__dirname, '../');
const appSrc = path.resolve(clientRoot, 'src');

module.exports = {
  clientRoot,
  appEntry: path.resolve(appSrc, 'index.tsx'),
  distPath: path.resolve(clientRoot, 'dist'),
  indexHtml: path.resolve(appSrc, 'index.html'),
  favicon: path.resolve(appSrc, 'favicon.ico'),
  assets: path.resolve(appSrc, 'app/assets')
};