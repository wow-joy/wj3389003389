const { resolve } = require('path');
module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    // [
    //   'import',
    //   {
    //     libraryName: '@wowjoy/core',
    //     customName: name => {
    //       return resolve(__dirname, `../../packages/components/src/${name}`);
    //     },
    //   },
    // ],
  ],
};
