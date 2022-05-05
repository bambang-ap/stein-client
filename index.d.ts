import { Opt, ReadOptions, EditOptions, DeleteOptions } from "stein-js-client";
declare class Stein {
    private store;
    sheetName: string;
    constructor(apiId: string, sheetName?: string);
    setSheetName(sheetName?: string): void;
    create<D>(rows: D[], options?: Opt): Promise<{
        updatedRange: string;
    }>;
    update<D>(options: EditOptions<D>): Promise<{
        updatedRange: string;
    }>;
    delete<D>(options: DeleteOptions<D>): Promise<{
        updatedRange: string;
    }>;
    get<D>(options?: ReadOptions): Promise<D[]>;
}
export default Stein;
