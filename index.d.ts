/// <reference path="../stein-client/type.d.ts" />
import { Opt, ReadOptions, EditOptions, DeleteOptions } from "stein-js-client";
declare type Config = Opt & {
    sheetName: string;
};
declare type Manage = Record<string, string | number>;
declare class Stein {
    private store;
    private config;
    constructor(apiId: string, sheetName?: string);
    setConfig: (config: Config) => void;
    clearConfig: () => void;
    create<D extends Manage>(rows: D[], sheetName?: string): Promise<import("stein-js-client").UpdateResponse>;
    update<D extends Manage>(options: EditOptions<D>, sheetName?: string): Promise<import("stein-js-client").UpdateResponse>;
    delete<D extends Manage>(options: DeleteOptions<D>, sheetName?: string): Promise<import("stein-js-client").UpdateResponse>;
    get<D extends Record<string, string>>(sheetName?: string, options?: ReadOptions): Promise<D[]>;
    getWithType<D extends object>(sheetName?: string, options?: ReadOptions): Promise<D[]>;
    private getType;
}
export default Stein;
