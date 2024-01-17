// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        // ...
        '@pinia/nuxt',
        'nuxt-quasar-ui'
    ],
    devtools: {enabled: true},
    devServer: {
        port: 3001
    }

})
