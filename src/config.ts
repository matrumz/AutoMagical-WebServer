import * as libFunctions from "./lib/functions";
import * as path from "path";
import * as fs from "fs";
import * as os from "os";

/* Connection-related parameters in a configuration file. */
export interface IConnection
{
    port: number;
}

/* Routing-related parameters in a configuration file. */
export interface IRoutes
{
    followSymLinks: boolean;
    controllerRootDir: string;
    controllerPattern: string;
}

/**
 * Interface for representing a complete configuration file.
 */
export interface IConfig
{
    connection: IConnection;
    routes: IRoutes;
}

/* Loads and maintains a configuration file. */
export class Config implements IConfig
{
    /**
     * Initialize new, NULL, parameters,
     * attempt to load a config file,
     * and apply defaults for any parameter not found.
     *
     * @param configPath Path to configuration file, relative to server.[tj]s
     */
    constructor(public configPath?: string)
    {
        /* Init members */
        if (libFunctions.isNullOrWhitespace(this.configPath))
            this.configPath = path.join(os.homedir(), ".server.config.json")

        this.connection = { port: null };
        this.routes = { followSymLinks: null, controllerRootDir: null, controllerPattern: null };

        /* Detect/create a config file */
        try {
            /* Create empty JSON if file does not exist, fill later */
            if (!fs.existsSync(this.configPath))
                fs.writeFileSync(this.configPath, JSON.stringify({}));
        } catch (e) {
            throw new Error("Could not check for/create missing server config file (" + this.configPath + "): " + (<Error>e).message);
        }

        /* Load the config file */
        this.load();
    }

    /**
     * Uses the path stored in this object to read a JSON file from disk and apply it to this config object.
     */
    public load(): void
    {
        /* Get object from config file */
        var configContents: IConfig;
        try {
            configContents = JSON.parse(fs.readFileSync(this.configPath, { encoding: this.encoding }));
        } catch (e) {
            throw new Error("Could not load JSON object from server config file: " + (<Error>e).message);
        }

        /* Sync the file's object with this, giving precedent to values found in the file over values in this object */
        this.sync(false, configContents);
    }

    /* Write this object out to disk, using this object's path. */
    public dump(): void
    {
        var dumpObject: IConfig = { connection: this.connection, routes: this.routes };
        try {
            fs.writeFileSync(this.configPath, JSON.stringify(dumpObject, null, 4));
        } catch (e) {
            throw new Error("Could not write config to disk: " + (<Error>e).message);
        }
    }

    /**
     * Sync this object with another configuration object (likely read from disk).
     *
     * @param defaultToThis If TRUE, when values differ between this object and the passed object, the values in this object will not change, and vice-versa for FALSE.
     * @param obj The other config object (not necessary from the Config class) to sync with.
     */
    private sync(defaultToThis: boolean, obj: IConfig): void
    {
        /* Fill out passed object with required top-level objects */
        if (!obj.connection)
            obj.connection = { port: null };
        if (!obj.routes)
            obj.routes = { followSymLinks: null, controllerRootDir: null, controllerPattern: null };

        /* Merge this and passed object into a single, merged object, applying defaults as necessary. */
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
                ) || path.join(os.homedir(), "controllers/"),

                controllerPattern: (
                    defaultToThis ?
                        this.routes.controllerPattern || obj.routes.controllerPattern :
                        obj.routes.controllerPattern || this.routes.controllerPattern
                ) || "^.+\\.controller\\.js$"
            }
        }

        /* Toss the old obj, use the new, merged one for simplicity's sake */
        obj = mergedConfig;

        /* Make sure this gets the new values, too! */
        this.connection.port = mergedConfig.connection.port;
        this.routes.followSymLinks = mergedConfig.routes.followSymLinks;
        this.routes.controllerRootDir = mergedConfig.routes.controllerRootDir;
        this.routes.controllerPattern = mergedConfig.routes.controllerPattern;
    }

    public connection: IConnection;
    public routes: IRoutes;

    private encoding = "utf8";
}