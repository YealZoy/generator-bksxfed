const path = require('path');
let Glob = require('glob').Glob;
let mg = new Glob('**/*/page.js',{cwd:path.resolve(__dirname,'../../app/pages/'),sync:true});
let entriesPage = [];
entriesPage = mg.found;
for(let i = 0; i < entriesPage.length; i++){
	entriesPage[i] = entriesPage[i].replace('\/page.js','')
}
module.exports = entriesPage;