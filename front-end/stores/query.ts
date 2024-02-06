import {defineStore} from "pinia";
import db from "~/sql/db.enum";
import sql from "~/sql/sql.enum";
import type {IQueryResponse} from "~/components/IQueryResponse";
import type {IDb} from "~/components/IDb";


export const queryStore = defineStore("queryStore", {


    state: () => ({
        dbs: [] as Array<IDb>,
        db: {} as any | null,
        table: [] as Array<any> | null,
        queryResultSql: {} as IQueryResponse | null,
        pending: false as boolean,
        error: null as any
    }),
    actions: {
        async dbsList() {
            const {$api} = useNuxtApp()
            const {
                data
            } = await $api.dbs.list();
            this.dbs = data.value as Array<IDb>
        },
        async sendQuery(sql: string) {
            const {$api} = useNuxtApp()
            this.pending = true
            const {
                data,
                error
            } = await $api.query.getRows(sql);

            this.error = error
            this.pending = false
            return data.value
        },
        async applyFilters() {
            const fStore = filterStore()
            if (fStore.sql) {
                const data = await this.sendQuery(fStore.sql)
                this.queryResultSql = data && toRaw(data) || {} as IQueryResponse
                this.table = null
                this.db = null
                return
            }
            if (fStore.table && fStore.db) {
                const query = (`${fStore.db}:${sql.selectAllFrom} ${fStore.table};`)
                const data = await this.sendQuery(query)
                this.db = this.dbs.find((db) => db.name === fStore.db) ?? null
                this.table = data && toRaw(data.rows) || []
                this.queryResultSql = null
                return

            }
            if (!fStore.table && fStore.db) {
                this.table = null
                this.queryResultSql = null
                this.db = this.dbs.find((db) => db.name === fStore.db) ?? null
                return
            }
            this.table = null
            this.queryResultSql = null
            this.db = null
        }
    },
});
