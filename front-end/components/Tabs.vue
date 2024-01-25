<template>
  <q-tabs
      v-model="tabName"
      :breakpoint="0"
      align="left"
      class="bg-primary text-white shadow-2"
      dense
  >
    <q-tab v-for="myTab in tabs?.queries" :name="myTab.name" icon="storage">{{ myTab.name }}</q-tab>
    <q-tab icon="add" name="addButton" @click="addNewTab()"></q-tab>
  </q-tabs>
  <q-tab-panels v-model="tabName">
    <q-tab-panel v-for="(myTab, index) in tabs?.queries" :key="myTab.name" :name="myTab.name">
      <q-card>
        <q-card-section class="q-pa-md">
          <div class="q-mb-md">
            <div class="q-flex q-items-start q-justify-between float-right">
              <q-btn v-if="index !== 0" class="q-ml-auto" dense flat icon="close" round @click="closeCard(index)"/>
            </div>
          </div>
        </q-card-section>
        <QueryArea
            v-model:query="myTab.queryContent"
            v-model:result-data="myTab.resultData"
        />
      </q-card>
    </q-tab-panel>
  </q-tab-panels>
</template>

<script lang="ts" setup>
import type {ITab} from "~/components/ITab";
import type {IQueryResponse} from "~/components/IQueryResponse";

const {$api} = useNuxtApp()


const tabName = ref('query0')
const {
  data: tabs,
  pending,
  error
} = await $api.myQueries.getQueries();


function addNewTab() {
  const max = Math.max(...tabs.value?.queries.map(v => v.id) ?? [])
  const newTab: ITab = {
    id: max + 1,
    name: `query${max + 1}`,
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
</script>
