/**
 * @author [pengyaokang]
 * @email [pengyaokang@icloud.com]
 * @create date 2017-07-27 08:40:01
 * @modify date 2017-07-27 08:40:01
 * @desc [第一层级的index.js]
*/

const http = require('http');
const PORT = 2333;
const APP = require('./app');
const server = new APP();

http
    .createServer(server.initServer())
    .listen(PORT,
    () => {
        console.log(`listening on port ${PORT}`)
    }
    )