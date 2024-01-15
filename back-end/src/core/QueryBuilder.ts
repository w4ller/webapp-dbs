/**
 * Example query:
 *  test3:select id from media where media_barcode = 'PQQ1NG07';
 *  flowDB: select * from picture_blacklist WHERE media_id = @0;
 */
import {DbsSingletonService} from "../service/DbsSingleton.service";
import {BlacklistQueryCommandsEnum} from "./BlacklistQueryCommands.enum";
export class QueryBuilder {

    constructor() {
        return this;
    }

    private replaceParams(sql: string, params: Array<string>) {
        return sql.replace(/@(\d+)/g, function(match: string, idx) {
            const idxArray = parseInt(idx, 10);
            return params[idxArray] || match
        })
    }

    private thorwErrorOnBlacklistCommands(query: String) {
        if (Object.values(BlacklistQueryCommandsEnum)
            .some(value => query.toUpperCase().includes(value.toUpperCase()))) {
            throw new Error('Modify or write databases is not allowed')
        }
    }
    private async singleQuery(query: string, params: Array<string> = null): Promise<any> {
        if (!query) throw new Error ('No query to execute')
        this.thorwErrorOnBlacklistCommands(query)
        const [db , sql] = query.split(':')
        const sqlWithParams = params ? this.replaceParams(sql, params) : sql
        const result = await DbsSingletonService.getInstance().db(db.trim()).query(`${sqlWithParams};`)
        return result
    }

    private arrayToSqlString(array: Array<any>): Array<String> {
        if (array.length <= 1) return [array[0].toString()]
        let sql = array.map(s => {
            if (typeof s === 'string') return "'" + s + "'"
            return s
        }).toString()
        return [`(${sql})`]
    }
    private formatParams(result: any): Array<string> {
        let a = result.rows.map((row: any) => {
            return row[result.fields[0].name]
        })
        a = this.arrayToSqlString(a)
        return a
    }

    private async parseQuery(query: string): Promise<any> {
        const params: Array<any> = []
        let result = null
        const queries = query.split(';')
        queries.pop()
        for (let n = 0; n <= queries.length - 1; n++) {
            const r = await this.singleQuery(queries[n], params[n-1] )
            n !== queries.length -1 ? params.push(this.formatParams(r)) : result = r
        }
        return result.rows ?? []
    }
    async build(query: string): Promise<any> {
        return this.parseQuery(query)
    }

}
