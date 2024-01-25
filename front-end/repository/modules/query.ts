import {type FetchOptions} from 'ofetch';
import {type AsyncDataOptions} from '#app';

// locals
import FetchFactory from '../factory';
import type {IQueryResponse} from "~/components/IQueryResponse";

class QueryModule extends FetchFactory<IQueryResponse> {
    private RESOURCE = '/query';

    /**
     * Return the response as array
     * @param asyncDataOptions options for `useAsyncData`
     * @returns
     */
    async getRows(
        sql: string,
        asyncDataOptions?: AsyncDataOptions<IQueryResponse>
    ) {

        return useAsyncData(
            () => {
                const fetchOptions: FetchOptions<'json'> = {
                    headers: {}
                };
                return this.call(
                    'POST',
                    `${this.RESOURCE}`,
                    {sql: sql}, // body
                    fetchOptions
                )
            },
            asyncDataOptions
        )
    }
}

export default QueryModule;
