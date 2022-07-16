declare module "stein-js-client" {
  export type Auth = Record<"username" | "password", string>;
  export type UpdateResponse = { updatedRange: string };
  export type Opt = { authentication?: Auth };
  export type Options = {
    limit: number;
    offset: number;
    search: Record<string, string>;
  };
  export type DeleteOptions<D> = { search: Partial<D>; limit?: number };
  export type ReadOptions = Partial<Options>;
  export type EditOptions<D> = {
    set: D;
    search: Partial<D>;
    limit?: number;
  };

  class SteinStore {
    constructor(url: string);

    read<K extends string>(
      sheetName: string,
      options?: ReadOptions & Opt
    ): Promise<Record<K, string>[]>;

    append<D extends Record<string, string | number>>(
      sheetName: string,
      rows: D[],
      options?: Opt
    ): Promise<UpdateResponse>;

    edit<D extends Record<string, string | number>>(
      sheetName: string,
      options: EditOptions<D> & Opt
    ): Promise<UpdateResponse>;

    delete<D extends Record<string, string | number>>(
      sheetName: string,
      options: DeleteOptions<D> & Opt
    ): Promise<UpdateResponse>;
  }

  export default SteinStore;
}
