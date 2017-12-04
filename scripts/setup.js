#!/usr/bin/env node

const ServerConfig = require("../dist/config");

const config = new ServerConfig.Config();
config.dump();
