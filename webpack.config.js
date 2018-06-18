/// <binding ProjectOpened='Run - Development' />
const { PROD, BETA } = require('./environment');

if (PROD || BETA) {    
    module.exports = require('./webpack.prod.js');}
else {
    module.exports = require('./webpack.dev.js');
}