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

    const initializeFilterFromUrl = ref(false)

    const filter = computed({
        get: () => {
            return {
                db,
                table,
                sql,
                first: initializeFilterFromUrl
            }
        },
        set(filter) {
            initializeFilterFromUrl.value = true
            router.push({
                path: 'dashboard',
                query: {
                    db: filter.db.toString(),
                    table: filter.table.toString(),
                    sql: filter.sql.toString(),
                }
            })
        },
    })
    return {db, table, sql, filter, initializeFilterFromUrl}
});
