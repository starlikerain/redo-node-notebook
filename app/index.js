/**
 * @author [pengyaokang]
 * @email [pengyaokang@icloud.com]
 * @create date 2017-07-27 08:17:18
 * @modify date 2017-07-27 08:17:18
 * @desc [第一步]
 */
const fs = require('fs');

class App {
    constructor() {

    }
    initServer() {
        // 初始化工作
        let _package = require('../package.json');
        return (req, res) => {
            // 每个请求逻辑
            fs.readFile('./public/index.html', 'utf-8', (err, data) => {
                res.end(JSON.stringify(_package))
            })
        }
    }
}

module.exports = App;