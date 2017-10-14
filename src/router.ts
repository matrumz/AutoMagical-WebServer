import * as fs from "fs";
import * as path from "path";
import * as express from "express";
import * as libFunctions from "./lib/functions";
import { IRoutes } from "./config";
import * as _ from "underscore";

interface IRouteMap
{
    fileSystemPath: string;
    routePath: string;
}

export class Router
{
    constructor(
        private app: express.Application,
        private config: IRoutes
    ) { }

    /**
     * Load all controllers under controllerDir into the web-app routes
     * @param controllerDir The root dir to look for controllers.
     */
    public load(controllerDir: string = this.config.controllerRootDir): void
    {
        /* Get a list of controller files and generate route paths */
        const controllers =
            libFunctions.walk(controllerDir, true, true)
                .filter((filePath) =>
                {
                    return Router.isController(filePath);
                })
                .map((controllerFile): IRouteMap =>
                {
                    return {
                        fileSystemPath: controllerFile,
                        routePath: Router.fsPathToRoutePath(controllerFile, true, controllerDir)
                    };
                });

        /* Test for duplicate route paths */
        const routePaths = controllers.map((mapping) => { return mapping.routePath });
        const duplicateRoutes = _.difference(routePaths, _.uniq(routePaths, false));
        if (duplicateRoutes.length) {
            const duplicateMappings = controllers.filter((mapping) =>
            {
                duplicateRoutes.indexOf(mapping.routePath) >= 0;
            });
            console.error("ERROR: Duplicate routes caused by files:");
            duplicateMappings.forEach((mapping) =>
            {
                console.error(mapping.fileSystemPath);
            });
            throw new Error("Duplicate routes (" + duplicateRoutes.length + ")");
        }

        /* We made it here... must be good to go to create routes */
        controllers.forEach((mapping) =>
        {
            console.log("Creating route " + mapping.routePath + " for " + mapping.fileSystemPath);
            const eRouter = express.Router();
            const controllerClass = require(mapping.fileSystemPath);
            const controller = new controllerClass(eRouter);
            this.app.use(mapping.routePath, eRouter);
        });
    }

    private static isController(fileName: string): boolean
    {
        return (fileName || "").match(/^.+\.controller\.js$/i) !== null;
    }

    private static fsPathToRoutePath(fsPath: string, removeRootDir: boolean = true, controllerRootDir: string = null): string
    {
        fsPath.replace(/\\\\/g, "\\");

        var parts: string[] = fsPath.split(path.sep);
        if (removeRootDir)
            parts.splice(
                0,
                parts.indexOf(
                    path.normalize(controllerRootDir)
                    .replace(
                        new RegExp("\\"+path.sep + "$","g"),
                        ""
                    )
                    .split(path.sep).pop()
                ) + 1
            );


        parts.forEach((part, index) =>
        {
            parts[index] = path.parse(part).name.replace(/\W+/g, "_");
        });

        return "/" + parts.join("/");
    }
}