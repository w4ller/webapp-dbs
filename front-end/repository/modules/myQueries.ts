import {type FetchOptions} from 'ofetch';
import {type AsyncDataOptions} from '#app';


// locals
import FetchFactory from '../factory';
import type {ITab} from "~/components/ITab";


class MyQueryModule extends FetchFactory<{ queries: ITab[] }> {
    private RESOURCE = '/myQueries';

    /**
     * Return the response as array
     * @param asyncDataOptions options for `useAsyncData`
     * @returns
     */
    async getQueries(
        asyncDataOptions?: AsyncDataOptions<{ queries: ITab[] }>
    ) {
        return useAsyncData(
            () => {
                const fetchOptions: FetchOptions<'json'> = {
                    headers: {}
                };
                return this.call(
                    'GET',
                    `${this.RESOURCE}`,
                    undefined,
                    fetchOptions
                )
            },
            asyncDataOptions
        )
    }
}

export default MyQueryModule;
