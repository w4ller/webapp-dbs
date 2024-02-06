<template>
  <q-tabs
      v-model="tabName"
      :breakpoint="0"
      align="left"
      class="bg-primary text-white shadow-2"
      dense
  >
    <q-tab v-for="myTab in tabs?.queries" :name="myTab.name" icon="storage">{{ myTab.name }}</q-tab>
    <q-tab icon="add" name="addButton" @click="addNewTabFromButton()"></q-tab>
  </q-tabs>
  <q-tab-panels v-model="tabName">
    <q-tab-panel v-for="(myTab, index) in tabs?.queries" :key="myTab.name" :name="myTab.name">
      <q-card>
        <q-btn v-if="index !== 0" class="q-ml-auto close-button" dense flat icon="close" round
               @click="closeCard(index)"/>
        <KeepAlive>
          <QueryArea
              ref="queryArea"
              v-model:query="myTab.queryContent"
              v-model:result-data="myTab.resultData"
          />
        </KeepAlive>

      </q-card>
    </q-tab-panel>
  </q-tab-panels>
</template>

<script lang="ts" setup>
import type {ITab} from "~/components/ITab";
import type {IQueryResponse} from "~/components/IQueryResponse";

const qStore = queryStore()
const fStore = filterStore()
const {$api} = useNuxtApp()
const queryArea = ref(null)


const tabName = ref('query0')
const {
  data: tabs,
  pending,
  error
} = await $api.myQueries.getQueries();


function addNewTabFromButton() {
  const max = Math.max(...tabs.value?.queries.map(v => v.id) ?? [])
  addNewTab(max + 1)
  fStore.filter = {
    db: '',
    table: '',
    sql: ''
  }
}

function addNewTab(tabIndex: number) {
  const newTab: ITab = {
    id: tabIndex,
    name: `query${tabIndex}`,
    queryContent: '',
    resultData: {
      dbName: '',
      rows: []
    } as IQueryResponse
  }
  tabs.value?.queries.push(newTab)
  tabName.value = newTab.name
}

function closeCard(index: number) {
  tabs.value?.queries.splice(index, 1)
  tabName.value = tabs.value?.queries.find((t) => t.id === index)?.name || 'query1'
}

/*function selectTabFromUrlQueryParam() {
  if (!fStore.tab) return
  if (tabs.value?.queries.find((t) => t.id === parseInt(fStore.tab))) {
    tabName.value = `query${fStore.tab}`
    return
  }
  addNewTab(parseInt(fStore.tab))
}*/

onMounted(async () => {
  await qStore.dbsList()
  // selectTabFromUrlQueryParam()
})

</script>
<style>
.close-button {
  position: absolute;
  left: 96%;
}
</style>
