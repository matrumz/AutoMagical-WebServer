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
            alias: "C",
            type: String,
            multiple: true,
            defaultOption: true,
            group: ["generate"]
        },
        {
            name: "sample",
            alias: "S",
            type: String,
            multiple: false,
            group: ["generate"]
        },
        {
            name: "port",
            alias: "p",
            type: Number,
            multiple: false,
            group: ["start"]
        },
        {
            name: "controllers",
            alias: "c",
            type: String,
            multiple: false,
            group: ["start", "generate"]
        },
        {
            name: "controller-pattern",
            alias: "r",
            type: String,
            multiple: false,
            group: ["start"]
        },
        {
            name: "log",
            alias: "l",
            type: String,
            multiple: false,
            group: ["start"]
        },
        {
            name: "no-nodemon",
            alias: "n",
            type: Boolean,
            multiple: false,
            defaultValue: true,
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
                        "$ amwebs start [{bold --port} #] [{bold --controller-pattern} regex] [{bold --log} file] [{bold --nodemon}] [{bold --controllers} directory-list]",
                        "$ amwebs start --help"
                    ]
                },
                {
                    header: "Options",
                    optionList: [
                        {
                            name: "port",
                            description: "Port number for incoming web-requests.",
                            alias: "p",
                            type: Number,
                            multiple: false,
                            defaultOption: false,
                            typeLabel: "{underline #}"
                        },
                        {
                            name: "controller-pattern",
                            description: "RegEx to identify controller files by their file name.",
                            alias: "r",
                            type: String,
                            multiple: false,
                            defaultOption: false,
                            typeLabel: "{underline expression}"
                        },
                        {
                            name: "log",
                            description: "File in which to save log entries.",
                            alias: "l",
                            type: String,
                            multiple: false,
                            defaultOption: false,
                            typeLabel: "{underline file-path}"
                        },
                        {
                            name: "no-nodemon",
                            description: "Disable use of nodemon to automatically refresh the server when changes are detected.",
                            alias: "n",
                            type: Boolean,
                            multiple: false,
                            defaultOption: false
                        },
                        {
                            name: "controllers",
                            description: "Directory in which to look for controllers.",
                            alias: "c",
                            type: String,
                            multiple: true,
                            defaultOption: false,
                            typeLabel: "{underline directory} ..."
                        }
                    ]
                }
            ]),
            generate: clUsage([
                {
                    header: "amwebs - generate",
                    content: "Generates resources for amwebs."
                },
                {
                    header: "Synopsis",
                    content: [
                        "$ amwebs generate [{bold --port} #] [{bold --controller-pattern} regex] [{bold --log} file] [{bold --nodemon}] [{bold --controllers} directory-list]",
                        "$ amwebs generate --help"
                    ]
                }
            ]),
            test: clUsage([

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
