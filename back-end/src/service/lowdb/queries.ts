export interface IQuery {
    id: number
    name: string
    queryContent: string
    resultData: Array<Record<string, string>>
}

export class Queries implements IQuery {
    public id: number
    public name: string
    public queryContent: string
    public resultData: Array<Record<string, string>>
}
