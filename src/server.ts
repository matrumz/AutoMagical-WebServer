import * as express from "express";
import * as fs from "fs";
import * as router from "./router";
import { Config, IRoutes } from "./config";

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
        this.initRoutes(this.app, this.config.routes);
    }

    private initRoutes(app: Express.Application, routeConfig: IRoutes): void
    {
        /* Auto-create routes from directory structure
    }

    private config: Config;
    private app: Express.Application;
}
