const path = require('path')
const PACKAGE = require('../package.json')

module.exports = {
    /** 환경 변수 **/
    common: { // 공통
        env: {
            VERSION: '"'+PACKAGE.version+'"',
            BUCKET_NAME : '"temp.ramaya.co.kr"',
            BUCKET_REGION : '"ap-northeast-2"',
            IDENTITY_POOL_ID : '"ap-northeast-2:5ed12439-fc41-49d6-9d6d-c330812a749f"',
        }
    },
    dev: { // 개발 - 로컬
        env: {
            PUB_ENV: '"development"',
            RAMAYA_API: {
                TYPE: 0,
                URL: '"http://127.0.0.1:7777/"',
                X_API_KEY: '""'
            }
        }
    },
    prod: { // 운영 - aws
        env: {
            PUB_ENV: '"production"',
            RAMAYA_API: {
                TYPE: 0,
                URL: '"https://api.ramaya.co.kr/v1/"',
                X_API_KEY: '"eJAXst292B8OvfGO7eSUN9HNpr62yMsT52TYvtAW"'
            }
        }
    }
}
