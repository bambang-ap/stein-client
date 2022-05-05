declare module "stein-js-client" {
  export type Opt = { authentication?: string };
  export type Options = {
    limit: number;
    offset: number;
    search: Record<string, string>;
  };
  export type DeleteOptions<D> = { search: Partial<D>; limit?: number } & Opt;
  export type ReadOptions = Partial<Options> & Opt;
  export type EditOptions<D> = {
    search: Partial<D>;
    set: D;
    limit?: number;
  } & Opt;

  class SteinStore {
    constructor(url: string);

    read<K extends string>(
      sheetName: string,
      options?: ReadOptions
    ): Promise<Record<K, string>[]>;

    append<D extends Record<string, string>>(
      sheetName: string,
      rows: D[],
      options?: Opt
    ): Promise<{ updatedRange: string }>;

    edit<D extends Record<string, string>>(
      sheetName: string,
      options: EditOptions<D>
    ): Promise<{ updatedRange: string }>;

    delete<D extends Record<string, string>>(
      sheetName: string,
      options: DeleteOptions<D>
    ): Promise<{ updatedRange: string }>;
  }

  export default SteinStore;
}
