import * as clArgs from "command-line-args";
import clUsage = require("command-line-usage");

/* Set each command as a const that will be reused multiple times */
const start: string = "start";
const generate: string = "generate";
const test: string = "test";

const commandData: { name: string, summary: string }[] = [
    { name: start, summary: "Starts the web-server." },
    { name: generate, summary: "Generates sample and skeleton controllers." },
    { name: test, summary: "Executes a CI test of this utility." }
]

/** Commands available for amwebs */
export const commands: string[] = commandData.map((cmd) => { return cmd.name; })

/** Options for all commands available in amwebs */
export const options: clArgs.OptionDefinition[] & clUsage.OptionDefinition[] = [
    {
        name: "help",
        alias: "h",
        type: Boolean,
        multiple: false
    },
    {
        name: "controllers",
        alias: "c",
        description: "Directory in which to look for controllers.",
        type: String,
        multiple: true,
        typeLabel: "{underline directory}",
        group: [start]
    },
    {
        name: "controller",
        alias: "C",
        description: "Generate controller files from a list of controller names.",
        type: String,
        multiple: true,
        defaultOption: true,
        typeLabel: "{underline controller-names ...}",
        group: [generate]
    },
    {
        name: "sample",
        alias: "S",
        description: "Generate a sample controller file.",
        type: String,
        multiple: false,
        group: [generate]
    },
    {
        name: "port",
        alias: "p",
        description: "Port number for incoming web-requests.",
        type: Number,
        multiple: false,
        typeLabel: "{underline #}",
        group: [start]
    },
    {
        name: "controller-pattern",
        alias: "P",
        description: "RegEx to identify controller files by their file name",
        type: String,
        multiple: false,
        typeLabel: "{underline expression}",
        group: [start]
    },
    {
        name: "log",
        alias: "l",
        description: "File in which to save log entries.",
        type: String,
        multiple: false,
        typeLabel: "{underline file-path}",
        group: [start]
    },
    {
        name: "no-nodemon",
        alias: "N",
        description: "Disable use of nodemon to automatically refresh the server when changes are detected.",
        type: Boolean,
        multiple: false,
        defaultValue: false,
        group: [start]
    }
    // {
    //     name: "custom-controllers", // Use when we don't want .controller.js automatically appended to the passed controller names
    //     alias: "x",
    //     description: "Generate controller files from a list of controller names. Will not append .controller.js to the file-names. Use when generating controllers with custom controller patterns.",
    //     type: String,
    //     multiple: true,
    //     typeLabel: "{underline file-names}",
    //     group: [generate]
    // }
];

/** Usage messages */
export let usage: any = {};
usage.amwebs = clUsage([
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
        content: commandData
    }
]);
usage[start] = clUsage([
    {
        header: "amwebs - start",
        content: commandData.find((c): boolean => { return c.name === start }).summary || ""
    },
    {
        header: "Synopsis",
        content: [
            "$ amwebs start [{bold options} ...]",
            "$ amwebs start --help"
        ]
    },
    {
        header: "Options",
        optionList: options.filter((option): boolean =>
        {
            return (option.group && (option.group.indexOf(start) >= 0));
        })
    }
]);
usage[generate] = clUsage([
    {
        header: "amwebs - generate",
        content: commandData.find((c): boolean => { return c.name === generate }).summary || ""
    },
    {
        header: "Synopsis",
        content: [
            "$ amwebs generate [{underline controllers}] [{bold options ...}]",
            "$ amwebs generate --help"
        ]
    },
    {
        header: "Options",
        optionList: options.filter((option): boolean =>
        {
            return (option.group && (option.group.indexOf(generate) >= 0));
        })
    }
]);
usage[test] = clUsage([
    {
        header: "amwebs - test",
        content: commandData.find((c): boolean => { return c.name === test }).summary || ""
    },
    {
        header: "Synopsis",
        content: [
            "$ amwebs test"
        ]
    },
    {
        header: "Options",
        optionList: options.filter((option): boolean =>
        {
            return (option.group && (option.group.indexOf(test) >= 0));
        })
    }
]);
