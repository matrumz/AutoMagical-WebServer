#!/usr/bin/env node

import clCommands = require("command-line-commands");
import * as clArgs from "command-line-args";
import * as constants from "./lib/data/constants";
import * as models from "./lib/data/models";
import * as clData from "./lib/data/cli";
// import { cli } from "lib/data/constants";

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
        /* Get command */
        try {
            let parsedCmd = clCommands(clData.commands);
            var argv = parsedCmd.argv;
            var command = parsedCmd.command;
        }
        catch (e) {
            console.log(clData.usage.amwebs);
            return;
        }
        /* Get args */
        try {
            var args = clArgs(clData.options, { argv: argv, partial: true, camelCase: true } as clArgs.Options);
            var commandArgs = args[command];
        }
        catch (e) {
            console.log(clData.usage[command]);
        }

        /* Help messages */
        if (args._all.help) {
            if (command) {
                console.log(clData.usage[command] || "There is no help for this command.");
            }
            else {
                console.log(clData.commands)
            }
            return;
        }

        switch (command) {

            case "generate":
                CLI.generate(commandArgs as models.cli.ICliGenerateParams);
                break;

            case "start":
                CLI.start(commandArgs as models.cli.ICliStartParams);
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
