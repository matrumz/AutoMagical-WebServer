import * as express from "express";
import { Router } from "./router";
import { Config } from "./config";
import * as process from "process";

/**
 * A wrapper around an Express application,
 * configured by a custom Config object,
 * that listens for web-requests as defined by controllers found and linked by
 * a custom Router object.
 */
class Server
{
    /**
     * Init server and start immediately.
     * @param configPath Path to server configuration JSON file.
     */
    constructor(configPath: string = "../server.config.json")
    {
        try {
            this.init(configPath);
        } catch (e) {
            console.error("Failed to initialize: " + (<Error>e).message);
            console.log("Dumping config...");
            this.config.dump();
            return;
        }

        this.start();
    }

    /**
     * Creates objects needed for building and running the web-server.
     * Part of constructor sequence.
     * @param configPath Path to server configuration JSON file.
     */
    private init(configPath: string): void
    {
        /* Load the configuration for this session. A new config will be made if none found */
        this.config = new Config(configPath);

        /*
         * This class may say server, but it's nothing more than a wrapper.
         * 'app' from express is where all the magic happens.
         */
        this.app = express();

        /* Pass the app to Router so Router can add recognized URIs (web-addresses) to it */
        this.router = new Router(this.app, this.config.routes);

        /* Add addresses to be recognized by the web-server */
        this.initRoutes()
    }

    /**
     * Adds URIs to the application, and binds logic to each address.
     */
    private initRoutes(): void
    {
        /*
         * Auto-create routes from directory structure and files that match the controller pattern.
         * These routes will be bound to functions from the controller files.
         */
        this.router.load();

        /* Any path that's not added via the router will return a 404 and default message. */
        this.app.all("/*", (request, response) =>
        {
            response.status(404).send("That is not the controller you are looking for.");
        });
    }

    /**
     * Start server execution.
     *
     * WARNING: This is blocking, make sure all initialization is done before calling this.
     */
    private start(): void
    {
        console.log("Server configuration finalized: saving to disk...");
        this.config.dump();
        console.log("...config write-to-disk DONE.");

        console.log("Listening on port: " + this.config.connection.port)
        this.app.listen(this.config.connection.port);
    }

    /* Objects needed for server initialization/execution */
    private config: Config;
    private app: express.Application;
    private router: Router;
}

/* Change working directory to here so all paths are relative to this server script */
process.chdir(__dirname);
/* Server start */
var server = new Server();