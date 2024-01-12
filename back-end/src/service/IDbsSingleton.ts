import {IDbClientWrapper} from "./DbsSingleton.service";


export interface IDbsSingleton {
    db(dbName: string): IDbClientWrapper
}
