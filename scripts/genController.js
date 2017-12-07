#!/usr/bin/env node

console.log("Generating sample controller...");

const path = require("path");
const fs = require("fs");
const ServerConfig = require("../dist/config");

/* Gen or load config file */
var config;
try {
    config = new ServerConfig.Config();
    config.dump();
}
catch (e) {
    throw new Error("An error occurred while initializing the configuration file: " + e.toString());
}

function copyFile(source, target) {
    var contents = fs.readFileSync(source).toString();
    fs.writeFileSync(target, contents, { encoding: "utf8" });
}

copyFile(path.join(__dirname, "/resources/sample.controller.js"), path.join(config.routes.controllerRootDir, "sample.controller.js"));

console.log("... finished generating sample controller!");
