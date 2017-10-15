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

/**
 * Object for finding controllers and binding them to URIs used by an Express application.
 */
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
                    return this.isController(filePath);
                })
                .map((controllerFile): IRouteMap =>
                {
                    return {
                        fileSystemPath: controllerFile,
                        routePath: Router.fsPathToRoutePath(controllerFile, true, controllerDir)
                    };
                });

        /* Test for duplicate route paths */
        const countedRoutePaths = _.countBy(controllers, (controller) =>
        {
            return controller.routePath;
        });
        var duplicateRoutes: string[] = [];
        _.filter(countedRoutePaths, (count, path) =>
        {
            if (count > 1)
                duplicateRoutes.push(path)
            return false
        })

        /* Handle duplicate routes */
        if (duplicateRoutes.length) {
            const duplicateMappings = controllers.filter((mapping) =>
            {
                return duplicateRoutes.indexOf(mapping.routePath) >= 0;
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

    /**
     * Test if a file is a controller by its name.
     *
     * (Will use configuration)
     *
     * @param fileName File name/path to test for controller nomenclature.
     */
    private isController(fileName: string): boolean
    {
        return (fileName || "").match(/^.+\.controller\.js$/i) !== null;
    }

    /**
     * Manipulates a file-path to create a URI-possible string.
     *
     * @param fsPath File path to turn into URI
     * @param removeRootDir If TRUE, the controllerRootDir will be removed from the URI.
     * @param controllerRootDir The path to remove from the URI if removeRootDir is TRUE.
     */
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
                        new RegExp("\\" + path.sep + "$", "g"),
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