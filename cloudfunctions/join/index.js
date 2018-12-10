// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async(event, context) => {
    var memberInfo = event.value
    const member = db.collection(event.db)
    memberInfo._openid = event.userInfo.openId

    var isMember = await member.where({
        _openid: event.userInfo.openId
    }).get()
    isMember = isMember.data
    if (isMember.length) {
        try {
            await member.doc(isMember[0]._id).update({
                data: memberInfo
            })
        } catch (e) {
            console.error(e)
        }
    } else {
        try {
            await member.add({
                data: memberInfo
            })
        } catch (e) {
            console.error(e)
        }
    }
    return isMember.length
}