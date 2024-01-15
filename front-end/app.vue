<template>
  <div>
    <QueryArea @outputData="onData"></QueryArea>
    <DataTable :data="data"></DataTable>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import DataTable from "~/components/DataTable.vue";

const data: any = ref([])

function onData(payload: string) {
  data.value = payload
}

</script>
