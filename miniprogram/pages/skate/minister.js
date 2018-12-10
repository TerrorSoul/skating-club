// pages/skate/minister.js
var app = getApp();
var appConfig = app.config;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        show: false,
    },
    getname: function(event) {
        this.setData({
            name: event.detail.value,
        })
    },
    beMinister: function() {
        var name = this.data.name;
        var that = this
        if (name) {
            var inviter = this.data.inviter;
            const db = wx.cloud.database();
            db.collection('minister').add({
                data: {
                    name: name,
                    inviter: inviter,
                },
                success: res => {
                    wx.showToast({
                        title: '欢迎加入部长团',
                        success: res => {
                            setTimeout(function() {
                                wx.reLaunch({
                                    url: '/pages/index/index',
                                })
                            }, 1500)
                        }
                    })
                }
            })
        } else {
            wx.showToast({
                title: '请输入名字',
                icon: 'none',
            })
        }
    },
    showMinister: function() {
        var that = this;
        const db = wx.cloud.database();
        db.collection('minister').get({
            success: function(res) {
                that.setData({
                    ministers: res.data,
                    show: true,
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var inviter = options.inviter || '';
        this.setData({
            minister: appConfig.minister,
            inviter: inviter,
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
        var inviter = appConfig.minister;
        return {
            path: '/pages/skate/minister?inviter=' + inviter,
        }
    }
})