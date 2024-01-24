import {IDbClientWrapper} from "./IDbClientWrapper";

export interface IDbsSingleton {
    db(dbName: string): IDbClientWrapper

    localDb(): IDbClientWrapper
}
