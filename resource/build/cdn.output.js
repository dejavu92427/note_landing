const copy = require('recursive-copy');
const path = require('path');

/* gcp build
 process.argv = ['/usr/local/bin/node', 
 '/workspace/resource/config/copy-cdn-output.js', 
 'https://testcdn.com'];
*/
const outputDir = process.argv[2].split('://')[1];
console.info(`=> ${'copy-cdn-output'}`, '\n');
console.info(`=> ${'process.argv:'}`, process.argv, '\n');
console.info(`=> ${'cdn outputDir'}`, outputDir, '\n');

function copyCDNOutput() {
  if (!outputDir) {
    return;
  }

  copy(path.resolve(__dirname, '../../www'), path.resolve(__dirname, `../../${outputDir}`), function (err) {
    if (err) {
      console.log(`=> cdn.output error:`, `\n`);
      console.log(err);
      throw err;
    }
  });

  const src = path.resolve(__dirname, '../../www');
  const dest = path.resolve(__dirname, `../../${outputDir}`);
  const options = {
    overwrite: true,
  };

  copy(src, dest, options)
    .then(function (results) {
      console.info(results.length + ' file(s) copied');
    })
    .catch(function (error) {
      console.log(`=> cdn.output error:`, `\n`);
      console.log(err);
      throw err;
    });

}

copyCDNOutput();