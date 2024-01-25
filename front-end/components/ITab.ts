import type {IQueryResponse} from "~/components/IQueryResponse";

export interface ITab {
    id: number,
    name: string,
    queryContent: string,
    resultData: IQueryResponse
}
