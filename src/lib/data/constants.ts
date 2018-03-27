import * as clArgs from "command-line-args";

export namespace cli
{
    export const commands: string[] = [
        "generate",
        "start",
        "test"
    ];

    export const options: clArgs.OptionDefinition[] = [
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
            defaultOption: false,
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
            name: "controllerPattern",
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
    ]
}
