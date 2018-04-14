/** Values to configure a server session. */
export interface IConfig
{
    connection: {
        /** Port number server will bind/listen to. */
        port: number;
    };

    controllers: {
        /** Directories in which to look for controller files. */
        controllerDirs: string[];
        /** RegEx to identify controller files by their file name. */
        controllerPattern: string;
    };

    middleware: {
        /** Directories in which to look for controller files. */
        middlewareDirs: string[];
        /** RegEx to identify controller files by their file name. */
        middlewarePattern: string;
    };

    log: {
        /** File-path for log file. */
        log: string;
    };

    interface: {
        /** Disable use of nodemon to automatically refresh the server when changes are detected. */
        noNodemon: boolean;
    };
};

export class Config implements IConfig
{
    constructor() { }

    //region Interface properties

    connection: {
        port: number;
    };
    controllers: {
        controllerDirs: string[];
        controllerPattern: string;
    };
    middleware: {
        middlewareDirs: string[];
        middlewarePattern: string;
    };
    log: {
        log: string;
    };
    interface: {
        noNodemon: boolean;
    };

    //endregion

}
