/**
 * @author [pengyaokang]
 * @email [pengyaokang@icloud.com]
 * @create date 2017-07-27 09:26:11
 * @modify date 2017-07-27 09:26:11
 * @desc [static-server!!!!!静态资源服务器 HTML]
 */

const path = require('path');
const fs = require('fs');

// 分出一个 concat 路径的方法
let getPath = url => path.resolve(process.cwd(), 'public', `.${url}`);

let staticFunc = (req) => {

    let { url, method } = req;

    return new Promise((resolve, reject) => {
        if (url === '/') {
            url = '/index.html'
        }
        // 组合路径，因为需要  ‘node服务器启动路径+public+具体路径’;
        let _path = getPath(url);
        let body = fs.readFile(_path, (err, data) => {
            if (err) {
                resolve(`NOT FOUND ${err.stack}`);
            } else {
                resolve(data)
            }
        })
    });
};

module.exports = staticFunc;