<template>
  <div class="q-pa-md">
    <q-input v-model="text" type="textarea"/>

    <div class="q-gutter-xs">
      <q-separator/>
      <q-btn @click="sendQuery">Send query</q-btn>
      <q-btn @click="flowDB">FlowDB</q-btn>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {ref} from "vue";
import sql from "../sql/sql.enum"
import db from "../sql/db.enum"

const {$api} = useNuxtApp();
const emit = defineEmits(['outputData'])
const text = ref('');

async function flowDB() {
  text.value = `${db.FLOW_DB}:${sql.tables}`
  await sendQuery()
}

async function sendQuery() {
  const {
    data: rows,
    pending,
    error
  } = await $api.query.getRows(text.value);
  console.log(rows.value)
  emit('outputData', rows.value)
}
</script>
