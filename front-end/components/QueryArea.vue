<script lang="ts" setup>
import type {ModelRef} from "vue";
import db from "~/sql/db.enum";
import sql from "~/sql/sql.enum";
import type {IQueryResponse} from "~/components/Tabs.vue";

const {$api} = useNuxtApp()
const queryContent = defineModel('query') as ModelRef<string>
const resultData = defineModel('resultData') as ModelRef<IQueryResponse>
const dbName = ref('')

async function sendQuery(sql: string) {
  if (sql === '') return
  const {
    data: rows,
    pending,
    error
  } = await $api.query.getRows(sql);
  resultData.value = rows.value && toRaw(rows.value) || {} as IQueryResponse // rows ?? [{}]
  console.log(resultData)
}

async function dataTableClick(data: string) {
  await nextTick()
  await sendQuery(data)

}

function showDbTables(db: string) {
  sendQuery(`${db}:${sql.tables}`)
}
</script>

<template>
  <q-item-section>
    <TextArea
        v-model="queryContent"
        @sendQuery="sendQuery(queryContent)"/>
    <div class="q-gutter-xs">
      <q-btn @click="showDbTables(db.FLOW_DB)">FlowDB</q-btn>
      <q-btn @click="showDbTables(db.ACTIVITY)">Activity</q-btn>
      <q-btn @click="showDbTables(db.TEST3)">Test3</q-btn>
    </div>
    <q-separator/>
    <DataTable
        :db-data="resultData"
        @dt-click="dataTableClick"/>
  </q-item-section>
</template>
