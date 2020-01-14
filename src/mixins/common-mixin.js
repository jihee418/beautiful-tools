'use strict'
import Vue from 'vue'
// import axios from 'axios'
import Cookies from 'js-cookie'
import XLSX from 'xlsx'

// import blockUI from './plugin/jquery-block-ui'
// import Promise from 'bluebird'
//
// Promise.config({
//     // Enable cancellation
//     cancellation: true,
// });
// const TIMEOUT = 45000;

Vue.mixin({
    data: () => {
        return {
            scopedStore: null,
            //isLogin: false, // 추후 사용
            //token: ''       // 추후 사용
            apiUrl: 'https://aqeesl4mxi.execute-api.ap-northeast-2.amazonaws.com/Prod',
            // apiUrl: 'http://localhost:3002', //테스트용 url
        }
    },
    created: function() {
        if (this.$parent && this.$parent.scopedStore)
            this.scopedStore = this.$parent.scopedStore

        // 토큰 설정
        /*if (!this.token || this.token.length == 0) {
            let loginToken = Cookies.get('token')

            // 로그인 한 토큰
            if (loginToken) {
                this.token = loginToken
                this.isLogin = true
            }
        }*/

        // // axios 생성
        // this.axios = axios.create({
        //     timeout: TIMEOUT,   // request timeout
        //     withCredentials: false, //axios에서 쿠키에 접근할때 필요한 옵션이라고 함.
        //     //공통해더는 여기에
        //     headers : {
        //         // 'Authorization' : 'test'//this.token,
        //     }
        // });

        // this.axios.interceptors.response.use(this.onSuccess, this.onError)
    },
    methods: {
        sort : (list, sortFunc) => {
            // 날짜 오래된순 정렬
            let len = list.length-1;
            for (let i = 0; i<len; i++) {
                for (let l = 0; l < len; l++) {
                    let p = list[l];
                    let n = list[l+1];
                    if (sortFunc(p, n)) {
                        list[l] = n;
                        list[l+1] = p;
                    }
                }
            }
        },
        checkDuplication : (list, checkFunc) => {
            let len = list.length-1;
            for (let i = 0; i<len; i++) {
                for (let l = i+1; l < len; l++) {
                    let p = list[l];
                    let n = list[l+1];
                    if (checkFunc(p, n)) {
                        return true;
                    }
                }
            }
            return false;
        },
        // onSuccess : response => {
        //     // IE 8-9
        //     try {
        //         if (response.data == null && response.config.responseType === 'json' && response.request.responseText != null) {
        //             // eslint-disable-next-line no-param-reassign
        //             response.data = JSON.parse(response.request.responseText);
        //         }
        //     } catch (e) {
        //         // ignored
        //     }
        //     return response;
        // },
        // onError : function (error) {
        //    //공통 통신에러처리 부분 - 추후 코드에따른 메시지 처리
        //
        //     return Promise.reject(error)
        // },
        // get : function (url) {
        //     return this.request('GET', url)
        //     // return new Promise((resolve, reject) => {
        //     //     this.axios.get(url).then((response) => {
        //     //         setTimeout(() => { resolve(response.data) }, 10)
        //     //     }).catch((error) => {
        //     //         if (reject) {
        //     //             setTimeout(() => { reject(error) }, 10)
        //     //         }
        //     //     })
        //     // })
        // },
        // post(url, payload, config) {
        //     return this.request('POST', url, payload, null, config)
        // },
        // postBody(url, postBody, key) {
        //     let headers = {
        //         'Content-Type': 'application/json; charset=utf-8'
        //     }
        //     if (key) {
        //         headers['Authorization'] = key
        //     }
        //     return this.request('POST', url, postBody, headers)
        // },
        // postForm(url, formData, key) {
        //     let headers = {
        //         'Content-Type': 'multipart/form-data'
        //     }
        //     if (key) {
        //         headers['Authorization'] = key
        //     }
        //     return this.request('POST', url, formData, headers)
        // },
        // put(url, payload) {
        //     return this.request('PUT', url, payload)
        // },
        // delete(url, payload) {
        //     return this.request('DELETE', url, payload)
        // },
        // request : function (type, url, payload, headers, _config) {
        //
        //     if (payload === undefined) payload = {}
        //     //공통 페이로드 메타데이터 추가
        //     payload.meta = {};
        //
        //     const CancelToken = axios.CancelToken;
        //     const source = CancelToken.source();
        //
        //     let config = {
        //         method : type,
        //         url : url,
        //         responseType : 'json',
        //         data : payload,
        //         cancelToken: source.token
        //     }
        //     for (let key in _config) {
        //         config[key] = _config[key]
        //     }
        //
        //     if (!headers) headers = {}
        //
        //     if (headers['Content-Type'] !== 'multipart/form-data' )
        //         headers['x-api-key'] = 'eJAXst292B8OvfGO7eSUN9HNpr62yMsT52TYvtAW'
        //
        //     if (headers) config.headers = headers
        //
        //     return new Promise((resolve, reject, onCancel) => {
        //         onCancel(()=>{
        //             // axios cancel
        //             source.cancel()
        //         })
        //         this.axios.request(config)
        //             .then(response => {
        //                 let return_response = response.data
        //                 if (return_response === null) return_response = {}
        //                 return_response.headers = response.headers
        //             setTimeout(() => { resolve(return_response) }, 10)
        //         }).catch(error => {
        //             if (reject) {
        //                 setTimeout(() => { reject(error) }, 10)
        //             }
        //         })
        //     })
        // },
        //json으로 폼전송 - 엑셀다운로드 등에 사용
        payloadToForm: function(url, payload) {
            let formEl = document.createElement('form');
            let inputEl = document.createElement('input');
            formEl.action = url;
            formEl.method = 'post';
            inputEl.type = 'hidden';
            inputEl.name = 'payloadJson';
            inputEl.value = JSON.stringify(payload);
            formEl.appendChild(inputEl);
            document.body.appendChild(formEl);
            formEl.submit();
            setTimeout(function () {
                document.body.removeChild(formEl);
            },100);
        },
        //임시 객체배열 to FormData (배열[객체,객체,객체...] -> formData)
        getFormData: function(o) { //일단은 1차원 배열만
            let formData = new FormData();

            //Array.isArray() : IE9^
            if (Array.isArray(o)) { // list - 객체 배열
                for( let i in o ) {
                    // let arrElFormData = new FormData();
                    for ( let key in o[i]) {
                        // arrElFormData.append(key, o[i][key])
                        if (o[i][key] instanceof File) { //파일일 경우
                            formData.append(key, o[i][key])
                        } else {
                            formData.append(key+'[]', o[i][key])
                        }
                    }
                    //formData.append(i, o)
                    // formData.append('list[]', arrElFormData);
                }
            } else { //단건
                for ( let key in o) {
                    formData.append(key, o[key])
                }
            }

            return formData;
        },
        getLogo: function(){
            return 'https://kr.vuejs.org/images/logo.png'
        },
        showLoading: function($el) {
            //TODO 구현필요
            // blockUI.block({target: $el!==undefined ? $el:this.$el, imageOnly: true});
        },
        hideLoading: function($el) {
            //TODO 구현필요
            // blockUI.unblock($el!==undefined ? $el:this.$el);
        },
        /**
         * 3자리 콤마
         * @param Number val 숫자
         */
        comma : function (d) {
            if (d === '-') return d
            else if (d === null) return 0
            else return d.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        },
        /**
         *
         * 입력폼에 숫자만 입력 가능하게 함
         *
         *  keydown : onlyNumber()
         *  keyup : removeChar()
         */
        onlyNumber: function() {
            let event = event || window.event
            let keyID = (event.which) ? event.which : event.keyCode
            if ( ( keyID >=48 && keyID <= 57 ) || ( keyID >=96 && keyID <= 105 ) || keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39 ) {
                return
            } else {
                return false
            }
        },
        removeChar : function () {
            let event = event || window.event
            let keyID = (event.which) ? event.which : event.keyCode
            if ( keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39 ) {
                return
            } else {
                //IE 10 대응 - IE10 에서는 srcElement
                if (!event.target) {
                    event.srcElement.value = event.srcElement.value.replace(/[^0-9]/g, "")
                } else {
                    event.target.value = event.target.value.replace(/[^0-9]/g, "")
                }
            }
        },
        errorToast(msg) {
            // toastr.options.positionClass = 'toast-top-center';
            // toastr.error(msg);
            //TODO Toast구현필요
            alert(msg)
        },
        infoToast(msg) {
            // toastr.options.positionClass = 'toast-top-center';
            // toastr.info(msg);
            //TODO Toast구현필요
            alert(msg)
        },
        //Util.js의 successToast 와 같은것
        toast(msg) {
            // toastr.options.positionClass = 'toast-top-center';
            // toastr.success(msg);
            //TODO Toast구현필요
            alert(msg)
        },
        //response 혹은 error의 메시지 추출
        getMessage(response) {
            let msg = false;

            //의도된 에러 - if(response.meta.result) - reject(response)일 경우
            if (response.meta) {
                let meta = response.meta;

                if(response.meta.errorCode) {
                    msg = '[ ' + meta.code + ' - '+meta.errorCode+' ] ' + meta.message
            } else {
                msg = '[ ' + meta.code + ' ] ' + meta.message
            }


            //의도치않은 에러 - catch(e => reject(e)) 일 경우
            } else if (response.response) {

                if (response.response.data.meta.message) {
                    msg = response.response.data.meta.message;
                } else {
                    msg = '[' + response.response.status + '] 시스템 오류가 발생했습니다.';
                }


            //서버조차 도달하지 못했을경우 - 보통 스크립트 에러
            } else {
                msg = '알수 없는 오류가 발생했습니다.';

                if (response.message && response.message.indexOf('timeout') != -1) msg = '응답시간을 초과하였습니다.';
                console.error(response)
            }

            return msg;
        },
        //에러 토스트 표출
        showErrorToast(response){
            this.errorToast(this.getMessage(response));
            this.hideLoading();
        },
        deepCopy(data) {
            return JSON.parse(JSON.stringify(data));
        },
        //테스트용 - 객체, 배열 찍어볼때 사용
        p_o: (o, mode) => {
            if (Array.isArray(o)) {
                for (let i in o) {
                    let text = '';
                    for (let key in o[i]) {
                        text += key + ': ' + o[i][key] + ' | '
                    }
                    console.log(text);
                }
            } else {
                let text = ''
                for (let key in o) {
                    mode === 'short' ? text += key + ': ' + o[key] + ' | ' : console.log(key + ': ' + o[key])
                }
                if (mode === 'short') console.log(text)
            }
        },
        //테스트용 - 폼데이터 찍어볼때 사용
        p_fd: (fd, mode) => {
            let text = ''
            for (let pair of fd.entries()) {
                mode === 'short' ? text += pair[0]+': ' + pair[1] + ' | ' : console.log(pair[0]+': ' + pair[1]);
            }
            if (mode === 'short') console.log(text)
        },
        messageAndFocus:function(msg, ref) {
            this.infoToast(msg);
            ref.focus();
            return false;
        },
        // 스크립트형 엑셀다운로드 - 수입산
        excelDownload (header, dataList, fileName, sheetName) {

            if (!fileName) fileName = '샘플'
            if (!sheetName) sheetName = '샘플시트'

            let wb = XLSX.utils.book_new() // make Workbook of Excel
            let ws = XLSX.utils.json_to_sheet([{}], {header : header})
            XLSX.utils.sheet_add_json(ws, dataList, {skipHeader : true, origin : 'A2'})
            XLSX.utils.book_append_sheet(wb, ws, sheetName || fileName) // sheetAName is name of Worksheet

            let today = new Date()
            today = today.toISOString().slice(0, 10)
            today = today.replace(/-/gi, '')

            let file = fileName + '_' + today + '.xlsx'

            XLSX.writeFile(wb, file)
        },
        getExcelData(sheet) {
            return XLSX.utils.sheet_to_json(sheet);
        },
        getExcelHeaders(sheet) {
            var headers = [];
            var range = XLSX.utils.decode_range(sheet['!ref']);
            var C, R = range.s.r; /* start in the first row */
            /* walk every column in the range */
            for(C = range.s.c; C <= range.e.c; ++C) {
                var cell = sheet[XLSX.utils.encode_cell({c:C, r:R})] /* find the cell in the first row */

                var hdr = "UNKNOWN " + C; // <-- replace with your desired default
                if(cell && cell.t) hdr = XLSX.utils.format_cell(cell);

                headers.push(hdr);
            }
            return headers;
        },
        isExcelFile(file) {
            let fileName = file.name
            let extension = fileName.substring(fileName.lastIndexOf('.')+1, fileName.length)
            if (['xlsx', 'xls'].indexOf(extension) == -1) {
                return false
            }
            return true
        },
        // 구버전 API : response.meta.result, 신버전 API : response.meta.code == 200
        isOk (response) {
            return response && response.meta && (response.meta.result || response.meta.code == 200)
        },
    },
});
