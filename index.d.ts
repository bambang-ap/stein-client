/// <reference path="../stein-client/type.d.ts" />
import { ReadOptions, EditOptions, DeleteOptions, Auth } from "stein-js-client";
declare type Manage = Record<string, string | number>;
declare class Stein {
    private client;
    private authentication;
    constructor(apiId: string, authentication?: Auth);
    create<D extends Manage>(sheetName: string, rows: D[]): Promise<import("stein-js-client").UpdateResponse>;
    update<D extends Manage>(sheetName: string, options: EditOptions<D>): Promise<import("stein-js-client").UpdateResponse>;
    delete<D extends Manage>(sheetName: string, options: DeleteOptions<D>): Promise<import("stein-js-client").UpdateResponse>;
    get<D extends Record<string, string>>(sheetName: string, options?: ReadOptions): Promise<D[]>;
    getWithType<D extends object>(sheetName: string, options?: ReadOptions): Promise<D[]>;
    private getType;
}
export default Stein;
