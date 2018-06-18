const { PROD, BETA } = require("../../environment");

let config;

if (PROD || BETA) {
    config = require("./configureStore.prod");
} else {
    config = require("./configureStore.dev");
}

export { config };
