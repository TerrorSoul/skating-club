// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const member = db.collection('member')

// 云函数入口函数
exports.main = async (event, context) => {
    try {
        return await member.doc(event['_id']).remove()
    } catch(e) {
        console.error(e)
    }
}