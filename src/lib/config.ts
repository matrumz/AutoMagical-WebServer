import * as myTools from "matrumz-toolbox";
import * as cloner from "cloner";

//region Interfaces

export namespace SubTypes
{
    export interface IConnection
    {
        /** Port number server will bind/listen to. */
        port: number;
    };
    export interface IControllers
    {
        /** Directories in which to look for controller files. */
        controllerDirs: string[];
        /** RegEx to identify controller files by their file name. */
        controllerPattern: string;
    };
    export interface IMiddleware
    {
        /** Directories in which to look for middleware files. */
        middlewareDirs: string[];
        /** RegEx to identify middleware files by their file name. */
        middlewarePattern: string;
    };
    export interface ILog
    {
        /** File-path for log file. */
        log: string;
    };
    export interface IInterface
    {
        /** Disable use of nodemon to automatically refresh the server when changes are detected. */
        noNodemon: boolean;
    }
}

/** Values to configure a server session. */
export interface IConfig
{
    connection: SubTypes.IConnection;
    controllers: SubTypes.IControllers;
    middleware: SubTypes.IMiddleware;
    log: SubTypes.ILog;
    interface: SubTypes.IInterface;
};

//endregion

export class Config implements IConfig
{
    /**
     * Instantiates a new Server Configuration object.
     *
     * Default values are used for any missing arguments
     * @param {IConfig} [config=Config.default] Starting values for the configuration object.
     */
    constructor(config: IConfig = {} as IConfig)
    {
        this.mergeIn(Config.default, config);
    }

    //region Public Functions

    /**
     * Resets the Config object back to default values.
     */
    public reset(): void
    {
        this.data = Config.default;
    }

    /**
     * Combine one or more IConfig objects into this Config object.
     *
     * If data is passed that already exists in this object, this object's data will be overwritten.
     * @param sources One or more IConfig objects.
     */
    public mergeIn(...sources: IConfig[]): void
    {
        if (!sources)
            sources = [];
        sources.unshift(this.data);

        this.data = cloner.deep.merge({}, ...sources);
    }

    //endregion

    //region Public Static Functions

    /**
     * Return a proper configuration object from a flat object. Useful for unflattening command-line args.
     * @param [obj] A flat config object to unflatten into a proper config object.
     */
    public static unflatten(obj: any): IConfig
    {
        return {
            connection: {
                port: obj.port
            },
            controllers: {
                controllerDirs: obj.controllerDirs,
                controllerPattern: obj.controllerPattern
            },
            middleware: {
                middlewareDirs: obj.middlewareDirs,
                middlewarePattern: obj.middlewarePattern
            },
            log: {
                log: obj.log
            },
            interface: {
                noNodemon: obj.noNodemon
            }
        };
    }

    //endregion

    //region Public Properties

    /**
     * The baseline values for this instance-configuration object.
     *
     * Uses deep-copy logic for getting/setting.
     */
    public get data(): IConfig
    {
       return cloner.deep.merge({}, Config.default, {
            connection: this.connection,
            controllers: this.controllers,
            middleware: this.middleware,
            log: this.log,
            interface: this.interface
        });
    }
    public set data(source: IConfig)
    {
        this.connection = cloner.deep.copy(source.connection);
        this.controllers = cloner.deep.copy(source.controllers);
        this.middleware = cloner.deep.copy(source.middleware);
        this.log = cloner.deep.copy(source.log);
        this.interface = cloner.deep.copy(source.interface);
    }

    //endregion

    //region Public Static Constants

    public static get default(): IConfig
    {
        return {
            connection: {
                port: 3000
            },
            controllers: {
                controllerDirs: ["~/controllers/"],
                controllerPattern: "^.+\\.controller\\.js$"
            },
            middleware: {
                middlewareDirs: ["~/middleware/"],
                middlewarePattern: "^.+\\.middleware\\.js$"
            },
            log: {
                log: "~/.amwebs.log"
            },
            interface: {
                noNodemon: false
            }
        };
    }

    //endregion

    //region Interface Properties

    public connection: SubTypes.IConnection;
    public controllers: SubTypes.IControllers;
    public middleware: SubTypes.IMiddleware;
    public log: SubTypes.ILog;
    public interface: SubTypes.IInterface;

    //endregion

}
