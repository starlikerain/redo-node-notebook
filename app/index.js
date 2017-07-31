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

class App {
    constructor() {

    }

    initServer() {
        // 初始化工作
        return (req, res) => {
            let {url} = req;

            let body = '';
            let headers = {};
            if (url.match('action')) {
                apiServer(url).then(val => {
                    body = JSON.stringify(val);
                    headers = {
                        'Content-Type': 'application/json'
                    };
                    let finalHeader = Object.assign(headers, {'Author': 'StarLikeRain'});
                    res.writeHead(200, 'resolve ok', finalHeader);
                    res.end(body);
                });
            } else {
                // 如果不是index.html的js发出请求
                staticServer(url).then((body) => {
                    let finalHeader = Object.assign(headers, {'Author': 'StarLikeRain'});
                    res.writeHead(200, 'resolve ok', finalHeader);
                    res.end(body);
                })
            }
        }
    }
}

module.exports = App;