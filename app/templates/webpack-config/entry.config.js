const path = require('path');
let entriesPage = require('./base/page-entries.config.js');
let pages = path.resolve(__dirname, '../app/pages');
let configEntry = {};
entriesPage.forEach((page) => {
  	configEntry[page] = path.resolve(pages, page + '/page');
});
module.exports = configEntry;
