const EVENT = process.env.npm_lifecycle_event || '';

const PROD = EVENT.includes('prod') || EVENT.includes('production');
const BETA = EVENT.includes('beta');

const NODE_ENV = PROD ? 'production' : BETA ? 'beta' : 'development';

const DEV = NODE_ENV.includes('development');

exports.DEV = DEV;
exports.PROD = PROD;
exports.BETA = BETA;
exports.NODE_ENV = NODE_ENV;