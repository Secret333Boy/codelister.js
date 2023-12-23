#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const rootPath = path.resolve(process.argv[2]);

const writeStream = fs.createWriteStream('./result.txt');

const generateCodeList = (rootPath: string, addedPath = '.') => {
  const elementNames = fs.readdirSync(path.join(rootPath, addedPath));

  for (const elementName of elementNames) {
    const elementPath = path.join(rootPath, addedPath, elementName);

    const isFile = fs.statSync(elementPath).isFile();

    if (isFile) {
      writeStream.write('// ' + path.join(addedPath, elementName) + '\n');

      const fileText = fs.readFileSync(elementPath);
      writeStream.write(fileText);
      writeStream.write('\n');
      continue;
    }

    generateCodeList(rootPath, path.join(addedPath, elementName));
  }
};

generateCodeList(rootPath);

writeStream.close();
