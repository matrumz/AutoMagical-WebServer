#!/usr/bin/env node

console.log("Starting configuration...");

const ServerConfig = require("../dist/config");
const fs = require("fs");

/* Gen or load config file */
var config;
try {
    config = new ServerConfig.Config();
    config.dump();
}
catch (e) {
    throw new Error("An error occurred while initializing the configuration file: " + e.toString());
}

/* Create controllers directory if needed */
try {
    if (!fs.existsSync(config.routes.controllerRootDir)) {
        fs.mkdirSync(config.routes.controllerRootDir);
    }
}
catch (e) {
    throw new Error("An error occurred while initializing the controllers directory: " + e.toString());
}

console.log("...configuration completed successfully!");
