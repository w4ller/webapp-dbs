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
            const db = filter.db.toString()
            router.push({
                path: 'dashboard',
                query: {
                    db: filter.db.toString(),
                    table: filter.table.toString(),
                    sql: filter.sql.toString(),
                    tab: filter.tab.toString(),
                }
            })
        },
    })
    return {db, table, tab, sql, filter}
});
