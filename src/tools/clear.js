const fs = require('fs');
const config = require('../config/index');

//기존 빌드 결과 소스 제거 로직 - html은 플러그인에 의해 알아서 치환됨
!function () {
    fs.readdir(config.path.build.script, (err, files) => {
        if (files !== undefined) {
            files.forEach(file => {
                fs.unlink(config.path.build.script + '/' + file, function (err) {
                    if (err) throw err;
                    console.log('successfully deleted ' + file);
                });
            });
        }
    })
}();
