/**
 * @author [pengyaokang]
 * @email [pengyaokang@icloud.com]
 * @create date 2017-07-27 08:17:18
 * @modify date 2017-07-27 08:17:18
 * @desc [第一步]
 */
const fs = require('fs');
const path = require('path');
const staticServer = require('./static-server');

class App {
    constructor() {

    }
    initServer() {
        // 初始化工作
        return (req, res) => {
            let { url } = req;
            // 每个请求逻辑 根据URL 进行代码分发
            let body = staticServer(url);
            res.writeHead(200, 'resolve ok', {'author':'Evan Yann'});
            res.end(body);
        }
    }
}

module.exports = App;