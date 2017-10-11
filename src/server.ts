import * as express from "express";
import * as fs from "fs";
import { Router } from "./router";
import { Config } from "./config";

class Server
{
    constructor()
    {
        this.init();
        this.start();
    }

    private init(): void
    {
        this.config = new Config();
        this.app = express();
        this.router = new Router(this.app, this.config.routes);

        this.initRoutes()
    }

    private initRoutes(): void
    {
        /* Auto-create routes from directory structure and files that match the controller pattern */
        this.router.load(this.config.routes.controllerRootDir);

        /* Respond to all other requests with error */
        this.app.all("/*", (request, response) =>
        {
            response.status(404).send("That is not the controller you are looking for.");
        });
    }

    private start(): void
    {
        this.app.listen(this.config.connection.port);
    }

    private config: Config;
    private app: express.Application;
    private router: Router;
}

var server = new Server();