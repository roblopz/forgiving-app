import fs from 'fs';
import path from 'path';

fs.readFile(path.resolve(__dirname, '../.gitignore'), { encoding: 'utf-8' }, (err, data) => {
  if (err) console.log(err);
  console.log(data);
});