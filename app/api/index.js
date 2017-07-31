// api server
// 处理root shop变成列表

module.exports=(url)=> {
    let apiMap = {
        '/list.action': ['吃饭','睡觉','洗澡澡'],
        '/user.action': ['evan','male','human']
    };

    return Promise.resolve(apiMap[url]);
};