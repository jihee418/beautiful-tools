export default {
    namespaced : true,
    state: {
        menuList: []
    },
    getters: {
    },
    mutations: {
        // 값 세팅하는곳
        setMenu: (state, data) => { state.menuList = data; },
    },
    actions: { /* 통신처리 */
        // 메뉴 조회
        getMenu: function(context) {
            let url = 'menu';

            return new Promise((resolve, reject) => {
                this._vm.get(url)
                    .then(response => {
                        if(this._vm.isOk(response)) {
                            context.commit('setMenu', response.data.menuList)
                            resolve(response)
                        } else {
                            reject(response)
                        }
                    }).catch(error => reject(error))
            })
        },
    }
}
