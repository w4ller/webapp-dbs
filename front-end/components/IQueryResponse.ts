export interface IQueryResponse {
    dbName: string,
    rows: Array<any>,
    executedQuery: string,
    error: string
}
