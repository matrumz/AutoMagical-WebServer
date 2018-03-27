#!/usr/bin/env node

import clCommands = require("command-line-commands");
import * as clArgs from "command-line-args";
import * as constants from "./lib/data/constants";
import * as models from "./lib/data/models";

class CLI
{
    /**
     * CLI entry point of AutoMagical-WebServer (amwebs)
     */
    public static run()
    {
        /*
         * Parse CLI,
         * Get the amwebs command and arguments
         */
        const { command, argv } = clCommands(constants.cli.commands);
        const args: any = clArgs(constants.cli.options, { partial: true, argv: argv })[command];

        switch (command) {

            case "generate":
                CLI.generate({
                    controllers: args.controller,
                    sample: args.sample
                });
                break;

            case "start":
                CLI.start({
                    port: args.port,
                    controllers: args.controllers,
                    controllerPattern: args.controllerPattern,
                    log: args.log
                });
                break;

            case "test":
                CLI.test();
        }
    }

    private static generate(params: models.cli.ICliGenerateParams): void
    {
        console.log(params);
    }

    private static start(params: models.cli.ICliStartParams): void
    {
        console.log(params);
    }

    private static test(): void
    {

    }
}
CLI.run()
