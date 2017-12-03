const os = require("os");
const path = require("path");
const ServerConfig = require("../dist/config");

const config = new ServerConfig.Config();
config.dump();

console.log(path.resolve(os.homedir(config.routes.controllerRootDir), config.routes.controllerRootDir));