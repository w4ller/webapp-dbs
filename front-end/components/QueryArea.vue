<script lang="ts" setup>
import type {ModelRef} from "vue";
import db from "~/sql/db.enum";
import sql from "~/sql/sql.enum";
import type {IQueryResponse} from "~/components/IQueryResponse";
import type {IQueryError} from "~/components/IQueryError";

const {$api} = useNuxtApp()
const queryContent = defineModel('query') as ModelRef<string>
const resultData = defineModel('resultData') as ModelRef<IQueryResponse>
const pendingData = ref(false)
const errorData = ref(null) as any
const store = queryStore()

async function sendQuery(sql: string) {
  if (sql === '') return
  const {
    data,
    pending,
    error
  } = await $api.query.getRows(sql);

  errorData.value = error
  pendingData.value = pending.value && toRaw(pending.value)
  resultData.value = data.value && toRaw(data.value) || {} as IQueryResponse // rows ?? [{}]


}


const errors = computed(() => {
  console.log(errorData)
  return errorData as IQueryError && toRaw(errorData) as IQueryError || {} as IQueryError
})

async function dataTableClick(data: string) {
  await nextTick()
  await sendQuery(data)

}

function showFlowDbTables() {
  resultData.value = store.flowDb
}

function showTest3() {
  resultData.value = store.test3
}

function showActiviti() {
  resultData.value = store.activiti
}
</script>

<template>
  <q-item-section>
    <TextArea
        v-model="queryContent"
        @sendQuery="sendQuery(queryContent)"/>
    <div class="q-gutter-xs">
      <q-btn @click="showFlowDbTables">FlowDB</q-btn>
      <q-btn @click="showTest3()">Test3</q-btn>
      <q-btn @click="showActiviti()">Activiti</q-btn>
    </div>
    <q-separator/>

    <DataTable
        :db-data="resultData"
        @dt-click="dataTableClick"/>
    <q-separator/>
    <div v-if="errorData?.value">
      <p>{{ errorData }}</p>
    </div>

  </q-item-section>
</template>
