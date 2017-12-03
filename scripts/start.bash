#!/bin/bash

controllerDir=$(node ./scripts/startGetControllersDir.js)
echo "node returned: $controllerDir"
nodemon --watch $controllerDir ./dist/server.js