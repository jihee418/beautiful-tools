import Vue from 'vue'
import Router from 'vue-router'

//주석의 webpackChunkName = 코드스플릿 chunk Name으로 새용됨
const Main = () => import(/* webpackChunkName: "view" */ '../view/home')
const Product = () => import(/* webpackChunkName: "view" */ '../view/Product/Product')
const ProductStorefarm = () => import(/* webpackChunkName: "view" */ '../view/Product/Storefarm')
const SettlementExcel = () => import(/* webpackChunkName: "view" */ '../view/Settlement/SettlementExcel')
const JiheePlayground = () => import(/* webpackChunkName: "view" */ '../view/Jihee/Playground')
const JiheeYourGoodPlace = () => import(/* webpackChunkName: "view" */ '../view/Jihee/YourGoodPlace')
const AccountBookFrame = () => import(/* webpackChunkName: "view" */ '../view/AccountBook/Frame')
const AccountBookExcel = () => import(/* webpackChunkName: "view" */ '../view/AccountBook/Excel')

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        /* 메인화면 */
        {
            path: '/',
            name: 'Main',
            component: Main
        },
        {
            path: '/product',
            name: 'Product',
            component: Product
        },
        {
            path: '/product/storefarm',
            name: 'ProductStorefarm',
            component: ProductStorefarm
        },
        {
            path: '/settlement/excel',
            name: 'SettlementExcel',
            component: SettlementExcel
        },
        {
            path: '/jihee',
            name: 'Playground',
            component: JiheePlayground
        },
        {
            path: '/jihee/yourGoodPlace',
            name: 'YourGoodPlace',
            component: JiheeYourGoodPlace
        },
        {
            path:'/accountBook',
            name:'AccountBook',
            component: AccountBookFrame,
            children: [
                { path: 'excel', name: 'ExternalProduct', component: AccountBookExcel },
            ]
        },

    ]
})

// router.beforeEach((to, from, next) => {
//
//     let testFunc = fnction(){
//         alert('test')
//     }
//
//     testFunc();
// });

export default router
