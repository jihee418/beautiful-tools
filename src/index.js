/**
 * 진입용 index.js
 */
import Vue from 'vue'
import axios from 'axios'
import router from './router'
import App from './App'
// const App = () => import('./App.vue')
// const App = require('./App').default

Vue.prototype.$http = axios
Vue.config.silent = true

import SuiVue from 'semantic-ui-vue'
import 'semantic-ui-css/semantic.min.css'
Vue.use(SuiVue);

new Vue({
    el : '#app',
    router,
    components : { App },
    template : '<App/>'
});
//
//
// if (module.hot) {
//     let hot = module.hot;
//     var W3CWebSocket = require('websocket').w3cwebsocket;
//
//     var client = new W3CWebSocket('ws://localhost:3001/', 'echo-protocol');
//     client.onerror = function() {
//         console.log('Connection Error');
//     };
//     client.onopen = function() {
//         console.log('WebSocket Client Connected');
//     };
//     client.onclose = function() {
//         console.log('echo-protocol Client Closed');
//     };
//     client.onmessage = function(e) {
//         if (typeof e.data === 'string') {
//             let retryCount = 3;
//             let timer = setInterval(function(){
//                 try{
//                     hot.check(hot.apply);
//                     clearInterval(timer);
//                 } catch(e) {
//                     retryCount--;
//                     if (retryCount == 0) clearInterval(timer);
//                 }
//             }, 100);
//         }
//     };
// }
