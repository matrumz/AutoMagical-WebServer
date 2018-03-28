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
        var command: string;
        var argv: string[];
        var args: any;
        var commandArgs: any;
        /* Get command */
        try {
            let parsedCmd: { command: string, argv: string[] };
            parsedCmd = clCommands(constants.cli.commands);
            argv = parsedCmd.argv;
            command = parsedCmd.command;
        }
        catch (e) {
            console.log(constants.cli.usage.commands);
            return;
        }
        /* Get args */
        try {
            args = clArgs(constants.cli.options, { argv: argv, partial: true, camelCase: true } as clArgs.Options);
            commandArgs = args[command];
        }
        catch (e) {
            console.log(constants.cli.usage.options[command]);
        }

        /* Help messages */
        if (args._all.help) {
            if (command) {
                console.log(constants.cli.usage.options[command] || "There is no help for this command.");
            }
            else {
                console.log(constants.cli.usage.commands)
            }
            return;
        }

        switch (command) {

            case "generate":
                CLI.generate({
                    controllers: commandArgs.controller,
                    sample: commandArgs.sample
                });
                break;

            case "start":
                CLI.start({
                    port: commandArgs.port,
                    controllers: commandArgs.controllers,
                    controllerPattern: commandArgs.controllerPattern,
                    log: commandArgs.log
                });
                break;

            case "test":
                CLI.test();
                break;

            default:
                console.error("Woah there. I see you found an un-instantiated command. Please send me an email at the below address and include the command you used (" + (command || "NULL") + ") and the version of AutoMagical-WebServer that you are using.");
                console.error(constants.support.email);
                process.exit(constants.exitCodes.uninstantiatedCommand)
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
