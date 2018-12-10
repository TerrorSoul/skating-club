// pages/skate/join.js
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
        index: 0,
        index1: 0,
        choosing: false,
    },
    binPickChange(evt) {
        this.setData({
            index: evt.detail.value,
        })
    },
    binnianji(evt) {
        this.setData({
            index1: evt.detail.value
        })
    },
    choosedepartment(event) {
        if(event.detail.value == '是') {
            this.setData({
                choosing: true
            })
        } else {
            this.setData({
                choosing: false
            })
        }
    },
    formsubmit(event) {
        var value = event.detail.value;
        var minister = this.data.minister;
        if (value.name && value.phone) {
            wx.cloud.callFunction({
                name: 'join',
                data: {
                    value: value,
                    db: 'member'
                },
                success: res => {
                    var title = res.result ? '信息更新成功' : '欢迎加入风影轮滑社';
                    wx.showModal({
                        title: title,
                        content: '自由如风，相伴如影',
                        cancelText: '重新填写',
                        confirmText: '回首页',
                        success: (res) => {
                            if (res.confirm) {
                                wx.reLaunch({
                                    url: '/pages/index/index',
                                })
                            }
                        }
                    })
                },
                fail: err => {
                    console.error(err)
                }
            })
        } else {
            wx.showToast({
                title: '请完善信息',
                icon: 'none',
            })
        }
    },
    getmember() {
        wx.navigateTo({
            url: 'member',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            minister: appConfig.minister,
            nevermore: appConfig.minister == "罗昕",
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
        return {
            title: '加入我们',
            path: '/pages/skate/join',
        }
    }
})