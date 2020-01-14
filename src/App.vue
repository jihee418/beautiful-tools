<template>
    <div class="ramaya-container">
        <Menu/>
        <router-view class="ramaya-contents"/>
    </div>
</template>

<script>
    import './mixins/common-mixin.js'
    import './mixins/Http.js'
    import './assets/js/console.js'
    import Vue from 'vue'
    import store from './vuex/store'
    import '@babel/polyfill'

    import VueClipboard from 'vue-clipboard2'
    VueClipboard.config.autoSetContainer = true;
    Vue.use(VueClipboard);

    import Menu from './components/menu'

    export default {
        components: {Menu},

        store,
        name : 'App'
    }
</script>

<style scoped>
    /*.content-wrap { padding: 20px }*/
</style>
