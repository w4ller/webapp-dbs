<template>
  <div class="q-pa-md">
    <q-input v-model="text" type="textarea"/>

    <div class="q-gutter-xs">
      <q-separator/>
      <q-btn @click="sendQuery">Send query</q-btn>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {ref} from "vue";

const emit = defineEmits(['outputData'])
const text = ref('test3:select id from media;');


async function sendQuery() {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      "sql": text.value
    });
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    const response = await fetch("http://localhost:3000/query", requestOptions)
    emit('outputData', await response.json())

  } catch (e) {
    console.error('Fetch error:', e);
  }
}


</script>
