// pages/activities/activities.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        activitiesPhotos: ['https://skating-1256514671.cos.ap-beijing.myqcloud.com/activitiesPhotos/1.jpg', 'https://skating-1256514671.cos.ap-beijing.myqcloud.com/activitiesPhotos/2.jpg', 'https://skating-1256514671.cos.ap-beijing.myqcloud.com/activitiesPhotos/3.jpg', 'https://skating-1256514671.cos.ap-beijing.myqcloud.com/activitiesPhotos/4.jpg'],
        activitiesPages: ['dailyactivities', 'festivalactivities', 'warm', 'expedition'],
    },
    showActivities: function(event) {
        wx.navigateTo({
            url: this.data.activitiesPages[event.currentTarget.dataset.index]
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const windowHeight = wx.getSystemInfoSync().windowHeight;
        this.setData({
            height: windowHeight,
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