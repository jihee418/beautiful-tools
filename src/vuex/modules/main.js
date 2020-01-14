export default {
    namespaced : true,
    state: {
        mainTestText: 'I am Vue!'
    },
    getters: {
    },
    mutations: {
        // 값 세팅하는곳
        setTestText: (state, data) => { state.mainTestText = data; },
    },
    actions: { /* 통신처리 */
        // //배너 진열위치 조회
        // getBannerPosition: function(context, payload) {
        //     let url = '/api/exhibition/banner/position';
        //
        //     return new Promise((resolve, reject) => {
        //         this._vm.post(url, payload)
        //             .then(response => {
        //                 if(response != null && response.meta.result) {
        //                     if (payload.filter.bannerPositionUpNo) {
        //                         context.commit('setSubBannerPositionList', response.data);
        //                     } else {
        //                         context.commit('setBannerPositionList', response.data);
        //                     }
        //
        //                     resolve(response)
        //                 } else {
        //                     reject(response)
        //                 }
        //             }).catch(error => reject(error))
        //     })
        // },

        // 통신하는곳
        getTestText: function(context, payload) {
            context.commit('setTestText', '나는 뷰에요!')
        }
    }
}
