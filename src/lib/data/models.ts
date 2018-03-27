export namespace cli
{
    export interface ICliGenerateParams
    {
        controllers: string[];
        sample: boolean;
    }

    export interface ICliStartParams
    {
        port: number;
        controllers: string;
        controllerPattern: string;
        log: string;
    }
}
