import {defineStore} from "pinia";
import db from "~/sql/db.enum";
import sql from "~/sql/sql.enum";
import type {IQueryResponse} from "~/components/IQueryResponse";


export const queryStore = defineStore("queryStore", {
    state: () => ({
        flowDb: {} as IQueryResponse,
        test3: {} as IQueryResponse,
        activiti: {} as IQueryResponse

    }),
    actions: {
        async getFlowDB() {
            const {$api} = useNuxtApp()
            const {
                data
            } = await $api.query.getRows(`${db.FLOW_DB}:${sql.tables}`);
            this.flowDb = data.value as IQueryResponse
        },
        async getTest3() {
            const {$api} = useNuxtApp()
            const {
                data
            } = await $api.query.getRows(`${db.TEST3}:${sql.tables}`);
            this.test3 = data.value as IQueryResponse
        },
        async getActiviti() {
            const {$api} = useNuxtApp()
            const {
                data
            } = await $api.query.getRows(`${db.ACTIVITY}:${sql.tables}`);
            this.activiti = data.value as IQueryResponse
        }
    },
});
