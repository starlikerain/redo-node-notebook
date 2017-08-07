/**
 * @author [pengyaokang]
 * @email [pengyaokang@icloud.com]
 * @create date 2017-08-05 10:54:28
 * @modify date 2017-08-05 10:54:28
 * @desc [api所谓api就是给js调用用的]
 */

// api server
// 处理root shop变成列表

module.exports = (req) => {
    let {url, method, context} = req;

    let apiMap = {
        '/list.action': ['吃饭', '睡觉', '洗澡澡'],
        '/user.action': ['evan', 'male', 'human']
    };

    method = method.toLowerCase()

    if (method === 'get') {
        return Promise.resolve(apiMap[url]);
    } else {
        // post 请求处理body的逻辑放在url-parser
        let {body} = context

        return Promise.resolve(body)

        // 处理post
        // return new Promise((resolve, reject) => {
        //     let data = ''
        //     req.on('data', (chunk) => {
        //         data += chunk
        //     }).on('end', () => {
        //         resolve(JSON.parse(data))
        //     })
        // })
    }
};