import Vue from 'vue'
import AWS from 'aws-sdk'
import moment from 'moment'

Vue.mixin({
  data () {
    return {
    }
  },
  methods : {
    s3Upload (file) {
      AWS.config.update({
        region : env.BUCKET_REGION,
        credentials : new AWS.CognitoIdentityCredentials({
          IdentityPoolId : env.IDENTITY_POOL_ID,
        }),
      })

      var s3 = new AWS.S3({
        apiVersion : '2006-03-01',
        params : {Bucket : env.BUCKET_NAME},
      })

      let thisMoment = moment()
      let year = thisMoment.format('YYYY')
      let month = thisMoment.format('MM')
      let day = thisMoment.format('DD')
      let timestamp = thisMoment.format('x')
      let ext = file.name.substring(file.name.lastIndexOf('.')+1, file.name.length)

      let photoKey = year + '/' + month + '/' + day + '/' + timestamp + '.' + ext

      return new Promise((resolve, reject) => {
        s3.upload({
          Key : photoKey,
          Body : file,
          ACL : 'public-read',
        }, (err, data) => {
          if (err) {
            reject(err)
            return alert('파일 업로드중 에러가 발생하였습니다. ', err.message)
          }
          // alert('파일 업로드 성공')
          resolve(data)
        })
      })
    },
  },
})
