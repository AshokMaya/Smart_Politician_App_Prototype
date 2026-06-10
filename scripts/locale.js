const {exec} = require('child_process');
const path = require('path');
const fs = require('fs');

const srcDir = path.join(__dirname, '../src');
const localeSrcDir = path.join(__dirname, '../src/assets/compiled-locale');
const outputDir = path.join(__dirname, '../src/assets/locale');
const files = fs.readdirSync(localeSrcDir, 'utf-8');
const indexJs = path.join(outputDir, 'index.js');

const locales = files.map(fileName => fileName.split('.')[0] || '');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, {recursive: true});
}

locales.forEach(locale => {
  const outFile = path.join(localeSrcDir, `${locale}.json`);
  const extractCommand = `formatjs extract "${srcDir}/**/*.js*" --ignore="**/*.json" --out-file ${outFile} --id-interpolation-pattern [sha512:contenthash:base64:6]`;

  exec(extractCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error extracting messages for ${locale}:`, error);
      return;
    }
    console.log(`Extracted messages for ${locale}`);
    if (stderr) {
      console.error(`Error extracting messages for ${locale}:`, stderr);
    }

    exec(
      `formatjs compile ${localeSrcDir}/${locale}.json --ast --out-file ${outputDir}/${locale}.json`,
      (compileError, compileStdout, compileStderr) => {
        if (compileError) {
          console.error(
            `Error compiling messages for ${locale}:`,
            compileError,
          );
          return;
        }
        console.log(`Compiled messages for ${locale}`);
        if (compileStderr) {
          console.error(`Stderr for ${locale}:`, compileStderr);
        }
      },
    );
  });
});

let string = '';

locales.forEach(i => {
  if (i === 'en') {
    return;
  }

  string += `
    case '${i}':
      return require('./${i}.json');`;
});

const template = `export const getMessages = (language = 'en') => {
  switch (language) {${string}
    default:
      return require('./en.json');
  }
};
`;

fs.writeFileSync(indexJs, template, {encoding: 'utf-8'});
