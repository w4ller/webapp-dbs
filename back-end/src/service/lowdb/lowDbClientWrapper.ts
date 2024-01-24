import {IDbClientWrapper} from "../IDbClientWrapper";
import {JSONFilePreset} from 'lowdb/node'
import {IQuery, Queries} from "./queries";

export class lowDbClientWrapper implements IDbClientWrapper {
    public name: string
    public client: any
    public initialized: boolean = false


    query() {
    }

    async initialize() {
        if (this.initialized) return
        const posts = []
        const query = new Queries()
        query.id = 0
        query.name = 'query0'
        query.queryContent = '-- Example query: \ntest3: select * from media;'
        query.resultData = []
        posts.push(query)
        this.client = await JSONFilePreset('db.json', {queries: [query]})
        await this.client.write()
        this.initialized = true
    }

    async getQueries(): Promise<Array<IQuery>> {
        await this.initialize()
        await this.client.read()
        return this.client.data
    }
}
