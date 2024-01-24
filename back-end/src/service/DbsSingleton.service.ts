import {IDbsSingleton} from "./IDbsSingleton";
import {IDbClientWrapper} from "./IDbClientWrapper";
import {dbPGClientWrapper} from "./pg/dbPGClientWrapper";
import {lowDbClientWrapper} from "./lowdb/lowDbClientWrapper";


export class DbsSingletonService implements IDbsSingleton {
    private static instance: DbsSingletonService
    private connections: Array<IDbClientWrapper> = []

    private constructor() {
    }

    public static getInstance(): IDbsSingleton {
        if (!DbsSingletonService.instance) {
            DbsSingletonService.instance = new DbsSingletonService()
        }
        return DbsSingletonService.instance
    }

    db(dbName: string): IDbClientWrapper {
        let clientWrapper: IDbClientWrapper = this.connections.find(c => c.name === dbName)
        if (clientWrapper) return clientWrapper
        try {
            clientWrapper = dbName === 'local' ? new lowDbClientWrapper() : new dbPGClientWrapper(dbName)
            this.connections.push(clientWrapper)
            return clientWrapper
        } catch (error) {
            throw new Error(`${error}`)
        }
    }

    localDb(): IDbClientWrapper {
        return new lowDbClientWrapper()
    }
}
