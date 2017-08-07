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
const apiServer = require('./api/index');
const urlParser = require('./url-parser/idnex'); // 处理客户端request的 url的query参数，body参数，method参数

class App {
    constructor() {

    }

    initServer() {
        // 初始化工作
        return (req, res) => {
            let {url, method} = req;

            req.context = {
                body: '',
                query: {},
                method: 'get'
            }

            // 先给context的body query method赋值
            urlParser(req)
                .then(() => {
                    return apiServer(req)
                })
                .then(val => {
                    // 因为apiServer 给出的要么 [] 要么是 undefined
                    if (!val) {
                        return staticServer(req)
                    } else {
                        return val
                    }
                })
                .then(val => {
                    let base = {'Author': 'StarLikeRain'}
                    let body = ''

                    if (val instanceof Buffer) {
                        // 如果是Buffer类型，那就是静态页
                        body = val
                    } else {
                        body = JSON.stringify(val);
                        let finalHeader = Object.assign({'Content-Type': 'application/json'}, base);
                        res.writeHead(200, 'resolve ok', finalHeader);
                    }
                    res.end(body);
                })
        }
    }
}

module.exports = App;