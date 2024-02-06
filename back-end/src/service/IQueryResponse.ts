export interface IQueryResponse {
    rows: Array<any>,
    dbName: string,
    executedQuery: string,
    error: string
}
