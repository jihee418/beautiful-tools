import Vue from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'

const API_TIMEOUT = 60000

Vue.mixin({
    data() {
        return {
            ramayaAPI: {}
        }
    },
    computed: {
        ramayaApiInfo() {
            return env.RAMAYA_API
        },
    },
    methods: {
        // -- ramaya API 호출용 함수 --------------------------------------------------------------------
        get(url, payload, headers) {
            return this.request('GET', url, payload, headers, this.ramayaApiInfo)
        },
        post(url, payload, headers) {
            return this.request('POST', url, payload, headers, this.ramayaApiInfo)
        },
        put(url, payload, headers) {
            return this.request('PUT', url, payload, headers, this.ramayaApiInfo)
        },
        delete(url, payload, headers) {
            return this.request('DELETE', url, payload, headers, this.ramayaApiInfo)
        },
        // -- END : ramaya API 호출용 함수 --------------------------------------------------------------------

        request(method, url, payload, headers, apiInfo) {
            // X-API-KEY 혹은 Authorization 헤더는 created()의 엑시오스 생성부분에 있음
            let apiType = apiInfo.TYPE

            // api별 base url추가
            url = apiInfo.URL + url

            // GET 일 경우 payload 를 queryParameter
            if (method == 'GET' && payload) {
                url += ((url.indexOf('?') > -1) ? '&' : '?') + Object.keys(payload).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(payload[key])).join('&')
            }

            let config = {
                responseType: 'json',
                method: method,
                url: url,
                data: payload,
                headers: {},
            }

            if (!headers) headers = {}

            config.headers = headers

            return new Promise((resolve, reject) => {
                // axios 선택
                let _axios = this.axiosRamayaAPI
                // if (apiType == 1) {        // AdminAPI(cooperate-api)
                //     _axios = this.axiosAdminAPI
                // }

                _axios(config).then(response => {
                    setTimeout(() => { resolve(response.data) }, 10)
                }).catch(error => {
                    if (reject) {
                        setTimeout(() => { reject(error) }, 10)
                    }
                })

                _axios = undefined
            })
        },

        responseSuccess(response) {
            // IE 8-9
            try {
                if (response.data == null && response.config.responseType === 'json' && response.request.responseText != null) {
                    // eslint-disable-next-line no-param-reassign
                    response.data = JSON.parse(response.request.responseText);
                }
            } catch (e) {
                // ignored
            }
            return response;
        },
        responseError(error) {
            return Promise.reject(error)
        },
    },
    created() {
        // Ramaya Api
        this.axiosRamayaAPI = axios.create({
            timeout: API_TIMEOUT,
            headers: {
                // 기본헤더 세팅
                'x-api-key': this.ramayaApiInfo.X_API_KEY
            },
        })
        this.axiosRamayaAPI.interceptors.response.use(this.responseSuccess, this.responseError)
        this.axiosRamayaAPI.name2 = 'RamayaApiAxios'
    },
})
