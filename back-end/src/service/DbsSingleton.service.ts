import {IDbsSingleton} from "./IDbsSingleton";
import {Pool} from "pg";
import fs  from "fs";
import path from "path"

export interface IDbClientWrapper {
     name: string
     query(query: string): any
}

export class dbClientWrapper implements IDbClientWrapper {
    public name: string
    public client: any
    constructor(name: string, client: any) {
        this.name = name
        this.client = client
    }

    public async query(query: string) {
        try {
            return await this.client.query(query);
        } catch (error)
        {
            throw new Error(`${error}`);
        }

    }
}

export class DbsSingletonService implements IDbsSingleton {
    private static instance: DbsSingletonService
    private path = path.join(__dirname, '..', 'config', 'config.json');
    private config = JSON.parse(fs.readFileSync(this.path,'utf8'))
    private connections: Array<IDbClientWrapper> = []

    private constructor() {}

    public static getInstance(): IDbsSingleton {
        if(!DbsSingletonService.instance) {
            DbsSingletonService.instance = new DbsSingletonService()
        }
        return DbsSingletonService.instance
    }

    db(dbName: string): IDbClientWrapper {

        let clientWrapper: IDbClientWrapper = this.connections.find(c => c.name === dbName)
        if (clientWrapper) return clientWrapper
        try {
            clientWrapper = new dbClientWrapper(dbName, new Pool(this.config[dbName]))
            this.connections.push(clientWrapper)
            return clientWrapper
        } catch (error)
        {
            throw new Error(`${error}`)
        }

    }
}
