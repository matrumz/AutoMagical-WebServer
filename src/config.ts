import * as path from "path"
import * as fs from "fs"

export interface IConnection
{
    port: number;
}

export interface IRoutes
{
    followSymLinks: boolean;
    controllerRootDir: string;
}

export interface IConfig
{
    connection: IConnection;
    routes: IRoutes;
}

export class Config implements IConfig
{
    constructor(public configPath: string)
    {
        /* Init members */
        this.connection = { port: null };
        this.routes = { followSymLinks: null, controllerRootDir: null };

        try {
            /* Create empty JSON if file does not exist, fill later */
            if (!fs.existsSync(configPath))
                fs.writeFileSync(configPath, JSON.stringify({}));
        } catch (e) {
            throw new Error("Could not check for/create missing server config file (" + configPath + "): " + (<Error>e).message);
        }

        this.load();
    }

    public load(): void
    {
        var configContents: IConfig;
        try {
            configContents = JSON.parse(fs.readFileSync(this.configPath, { encoding: this.encoding }));
        } catch (e) {
            throw new Error("Could not load JSON object from server config file: " + (<Error>e).message);
        }

        this.sync(false, configContents);

        try {
            fs.writeFileSync(this.configPath, JSON.stringify(configContents));
        } catch (e) {
            throw new Error("Could not refresh server config file after load: " + (<Error>e).message);
        }
    }

    public dump(): void
    {
        var dumpObject: IConfig = { connection: this.connection, routes: this.routes };
        try {
            fs.writeFileSync(this.configPath, JSON.stringify(dumpObject));
        } catch (e) {
            throw new Error("Could not write config to disk: " + (<Error>e).message);
        }
    }

    private sync(defaultToThis: boolean, obj: IConfig): void
    {
        /* Fill out passed object with required top-level objects */
        if (!obj.connection)
            obj.connection = { port: null };
        if (!obj.routes)
            obj.routes = { followSymLinks: null, controllerRootDir: null };

        /* Merge this and passed object into a single, merged object */
        var mergedConfig: IConfig = {
            connection: {

                port: (
                    defaultToThis ?
                        this.connection.port || obj.connection.port :
                        obj.connection.port || this.connection.port
                ) || 3000

            },
            routes: {

                followSymLinks: (
                    defaultToThis ?
                        this.routes.followSymLinks || obj.routes.followSymLinks :
                        obj.routes.followSymLinks || this.routes.followSymLinks
                ) || false,

                controllerRootDir: (
                    defaultToThis ?
                        this.routes.controllerRootDir || obj.routes.controllerRootDir :
                        obj.routes.controllerRootDir || this.routes.controllerRootDir
                ) || "~/webControllers/"
            }
        }

        /* Toss the old obj, use the new, merged one for simplicity's sake */
        obj = mergedConfig;

        /* Make sure this gets the new values, too! */
        this.connection.port = mergedConfig.connection.port;
        this.routes.followSymLinks = mergedConfig.routes.followSymLinks;
        this.routes.controllerRootDir = mergedConfig.routes.controllerRootDir;
    }

    public connection: IConnection;
    public routes: IRoutes;

    private encoding = "utf8";
}