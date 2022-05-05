import { Opt, ReadOptions, EditOptions, DeleteOptions } from "stein-js-client";
declare class Stein {
    private store;
    sheetName: string;
    constructor(apiId: string, sheetName?: string);
    setSheetName(sheetName?: string): void;
    create<D extends Record<string, string>>(rows: D[], options?: Opt): Promise<{
        updatedRange: string;
    }>;
    update<D extends Record<string, string>>(options: EditOptions<D>): Promise<{
        updatedRange: string;
    }>;
    delete<D extends Record<string, string>>(options: DeleteOptions<D>): Promise<{
        updatedRange: string;
    }>;
    get(options?: ReadOptions): Promise<Record<string, string>[]>;
    getWithType<D extends object>(options?: ReadOptions): Promise<D[]>;
    getType(options?: ReadOptions): Promise<Record<string, [type: string, delimiter: string]>>;
}
export default Stein;
