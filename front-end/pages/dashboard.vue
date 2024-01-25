<template>
  <q-layout>
    <q-page-container>
      <q-page>
        <tabs></tabs>
      </q-page>
    </q-page-container>
  </q-layout>
</template>


<script lang="ts" setup>
const store = queryStore()


onMounted(async () => {
  await store.getFlowDB()
  await store.getTest3()
  await store.getActiviti()
  console.log(store.test3)
  console.log(store.flowDb)
  console.log(store.activiti)

})
</script>
