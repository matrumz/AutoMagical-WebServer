import * as clArgs from "command-line-args";
const clUsage = require("command-line-usage");

export namespace cli
{
    export const commands: string[] = [
        "generate",
        "start",
        "test"
    ];

    export const options: clArgs.OptionDefinition[] = [
        {
            name: "help",
            alias: "h",
            type: Boolean,
            multiple: false
        },
        {
            name: "controller",
            alias: "c",
            type: String,
            multiple: true,
            defaultOption: true,
            group: ["generate"]
        },
        {
            name: "sample",
            alias: "s",
            type: String,
            multiple: false,
            group: ["generate"]
        },
        {
            name: "port",
            alias: "P",
            type: Number,
            multiple: false,
            group: ["start"]
        },
        {
            name: "controllers",
            alias: "C",
            type: String,
            multiple: false,
            group: ["start", "generate"]
        },
        {
            name: "controller-pattern",
            alias: "R",
            type: String,
            multiple: false,
            group: ["start"]
        },
        {
            name: "log",
            alias: "L",
            type: String,
            multiple: false,
            group: ["start"]
        }
    ];

    export namespace usage
    {
        export const commands: any = clUsage([
            {
                header: "AutoMagical-WebServer (amwebs)",
                content: 'A skeleton Node/Express web server that automagically accepts web-requests on URIs dynamically generated from "plug-and-play" controller modules. A great starting point for RESTful newbs and casual DIY-ers. Inspired by Dan Wahlin\'s Pluralsight course: Integrating Angular with Node.js RESTful Services.'
            },
            {
                header: "Synopsis",
                content: "amwebs <command> <options>"
            },
            {
                header: "Command List",
                content: [
                    { name: "start", summary: "Starts the webserver." },
                    { name: "generate", summary: "Generate sample and skeleton controllers." },
                    { name: "test", summary: "Verify your installed version of amwebs." }
                ]
            }
        ]);

        export const options: any = {
            start: clUsage([
                {
                    header: "amwebs - start",
                    content: "Starts the webserver."
                },
                {
                    header: "Synopsis",
                    content: [
                        "$ amwebs start [{bold --port} #] [{bold --controller-pattern} regex] [{bold --log} file] [{bold controllers} file-list]"
                    ]
                }
            ])
        }
    }
}

export namespace support
{
    export const email = "admin@nobugs-justfeatures.com";
}

export namespace exitCodes
{
    export const uninstantiatedCommand = 1;
}
