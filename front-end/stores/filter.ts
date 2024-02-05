import {defineStore} from "pinia";

export const filterStore = defineStore("filterStore", () => {
    const route = useRoute()
    const router = useRouter()

    const db = computed(() => {
        return route.query.db?.toString() ?? ''
    })
    const table = computed(() => {
        return route.query.table?.toString() ?? ''
    })
    const sql = computed(() => {
        return route.query.sql?.toString() ?? ''
    })
    const tab = computed(() => {
        return route.query.tab?.toString() ?? ''
    })


    const filter = computed({
        get: () => {
            return {
                db,
                table,
                sql,
                tab
            }
        },
        set(filter) {
            console.log('filter', filter)
            if (
                filter.db === db.value &&
                filter.table === table.value &&
                filter.sql === sql.value &&
                filter.tab === tab.value
            ) return
            router.push({
                path: 'dashboard',
                query: {
                    db: filter.db,
                    table: filter.table,
                    sql: filter.sql,
                    tab: filter.tab,
                }
            })
        },
    })
    return {db, table, tab, sql, filter}
});
