// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 * 
 * event 参数包含
 * - 小程序端调用传入的 data
 * - 经过微信鉴权直接可信的用户唯一标识 openid 
 * 
 */
const cloud = require('wx-server-sdk')

// 默认配置
cloud.init()

// 获取数据库的引用
const db = cloud.database()

// 获取集合的引用
const minister = db.collection('minister')

exports.main = async (event, context) => {
    var isMinister = await minister.where({
        _openid: event.userInfo.openId
    }).get()

    isMinister = isMinister.data
    
    return isMinister.length ? isMinister[0].name : ''
}