export interface IDbClientWrapper {
    name: string
    client: any


    query(query: string): any

    getQueries(): any
}
