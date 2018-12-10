// miniprogram/pages/skate/member.js
var app = getApp();
var appConfig = app.config;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        xueyuan: [
            '国际经济贸易学院',
            '金融学院',
            '国际商学院',
            '英语学院',
            '外语学院',
            '法学院',
            '信息学院',
            '公共管理学院',
            '国际关系学院',
            '中国语言文学学院',
            '保险学院',
            '统计学院',
        ],
        nianji: [
            '大一~', '大二。', '大三。。', '大四。。。', '硕士。。。。', '博士。。。。？！'
        ],
    },
    deletemember: function(res) {
        var member = res.currentTarget.dataset.member
        var index = res.currentTarget.dataset.index
        var members = this.data.members
        var that = this
        wx.showModal({
            title: '删除“' + member.name + '”的会员信息',
            content: '无法找回，谨慎操作',
            success: function(res) {
                if (res.confirm) {
                    wx.cloud.callFunction({
                        name: 'deletemember',
                        data: {
                            _id: member['_id']
                        },
                        success: res => {
                            wx.showToast({
                                title: '删除成功',
                                success: res => {
                                    for (var i = index; i < members.length; i++) {
                                        members[i] = members[i + 1]
                                    }
                                    members.length--;
                                    that.setData({
                                        members: members,
                                    })
                                }
                            })
                        },
                        fail: console.error
                    })
                }
            }
        })
    },
    getwechat: function(res) {
        var member = res.currentTarget.dataset.member
        wx.setClipboardData({
            data: member.wechat,
        })
    },
    getphone: function (res) {
        var member = res.currentTarget.dataset.member
        wx.setClipboardData({
            data: member.phone,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this
        wx.hideShareMenu({
            success: res => {
                const db = wx.cloud.database();
                db.collection('member').get({
                    success: res => {
                        that.setData({
                            members: res.data,
                            nevermore: appConfig.minister == "罗昕",
                        })
                    }
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})