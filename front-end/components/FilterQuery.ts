import type {LocationQueryRaw} from "vue-router";

export class FilterQuery implements IFilterQuery {
    public db?: string = ''
    public table?: string = ''
    public sql?: string = ''
    public tab?: string = ''
    private route = useRoute()
    private router = useRouter()

    constructor() {
        this.setFiltersFromQueryParams()
    }

    public pushQueryParamsToRouter() {
        const params = this.getQueryParams()
        console.log(params)
        this.router.push({
            path: 'dashboard',
            query: this.getQueryParams() as LocationQueryRaw
        })
    }

    public setQueryParams(filters: IFilterQuery) {
        this.db = filters.db
        this.table = filters.table
        this.sql = filters.sql
        this.tab = filters.tab
    }

    private setFiltersFromQueryParams() {
        this.db = this.route.query.db?.toString() ?? ''
        this.table = this.route.query.table?.toString() ?? ''
        this.sql = this.route.query.sql?.toString() ?? ''
        this.tab = this.route.query.tab?.toString() ?? ''
    }

    private getQueryParams() {
        return {
            db: this.db,
            table: this.table,
            sql: this.sql,
            tab: this.tab
        } as IFilterQuery
    }
}
