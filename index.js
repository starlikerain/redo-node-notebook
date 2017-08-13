/**
 * @author [pengyaokang]
 * @email [pengyaokang@icloud.com]
 * @create date 2017-07-27 08:40:01
 * @modify date 2017-07-27 08:40:01
 * @desc [最外层初始化index.js]
 */

const http = require('http');
const PORT = 2333;
const APP = require('./app');
const server = new APP();

// middleware !!!
const staticServer = require('./app/static-server')
const apiServer = require('./app/api/index')
const urlParser = require('./app/url-parser/idnex') // 处理客户端request的 url的query参数，body参数，method参数

server.use(urlParser)
server.use(apiServer)
server.use(staticServer)

// launch app !!!
http
    .createServer(server.initServer())
    .listen(PORT,
        () => {
            console.log(`listening on port ${PORT}`)
        }
    )