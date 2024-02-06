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
const qStore = queryStore()
const fStore = filterStore()


onMounted(async () => {
  await qStore.dbsList()
  fStore.initializeFilterFromUrl = true
})
</script>
