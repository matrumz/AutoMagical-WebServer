const os = require("os");
const path = require("path");
const child = require("child_process");
const process = require("process");
const ServerConfig = require("../dist/config");

const config = new ServerConfig.Config();
config.dump();

// process.env.npm_package_config_controllers = path.resolve(os.homedir(), config.routes.controllerRootDir);
// console.log(process.env.npm_package_config_controllers)
// process.config

const command = "npm config set automagical-webserver:controllers " + path.resolve(os.homedir(config.routes.controllerRootDir), config.routes.controllerRootDir);
console.log("PRESTART will execute:");
console.log(command);

child.execSync(command);

console.log("PRESTART DONE")
