import * as fs from "fs";
import * as path from "path";
import * as express from "express";
import * as libFunctions from "./lib/functions";
import { IRoutes } from "./config";

export class Router
{
    constructor(
        private app: express.Application,
        private config: IRoutes
    ) { }

    /**
     * Load all controllers under controllerDir into the web-app routes
     * @param controllerDir The root dir to look for controllers.
     * @param recursiveRootDir DO NOT USE THIS! INTERNAL USE ONLY!
     */
    public load(controllerDir: string, recursiveRootDir: string = null): void
    {
        /* Preserve the original directory */
        if (!libFunctions.isNullOrWhitespace(recursiveRootDir))
            recursiveRootDir = path.basename(controllerDir);

        /* Walk-the-walk, talk-the-talk, and get all dem controllers */
        fs.readdirSync(controllerDir).forEach((file) =>
        {
            /* Get the info for each file */
            const fullPath = path.join(controllerDir, file);
            const stat = fs.lstatSync(fullPath);

            if (stat.isDirectory()) {
                /* Recursively find all controllers */
                this.load(fullPath, recursiveRootDir);
            }
            else if (this.isController(fullPath)) {
                /* Use js file-path to construct a route */
                let dirs = path.dirname(fullPath).split(path.sep);

                if (dirs[0].toLowerCase() === recursiveRootDir.toLowerCase())
                    dirs.splice(0, 1);

                const router = express.Router();
                const baseRoute = path.sep + dirs.join("?");
                console.log("Created route: " + baseRoute + " for " + fullPath);

                // const controllerClass = require(path.join("..", fullPath));
                // const controller = new controllerClass(router);
                // this.app.use(baseRoute, router);
            }
        });
    }

    private isController(fileName: string): boolean
    {
        var regexp: RegExp;

        try {
            if (!libFunctions.isNullOrWhitespace(this.config.controllerPattern))
                regexp = new RegExp(this.config.controllerPattern, 'i');
            else
                regexp = new RegExp(/.+\.controller\.js$/i)
        }
        catch (e) {
            return false
        }

        return regexp.test(fileName);
    }
}