// pages/skate/abstract.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        presidents: [
            {
                name: '2014届社长——花花', photo: 'https://skating-1256514671.cos.ap-beijing.myqcloud.com/%E5%8E%86%E4%BB%BB%E7%A4%BE%E9%95%BF/%E8%8A%B1%E8%8A%B1.jpg'
            },
            {
                name: '2015届社长——小小红', photo: 'https://skating-1256514671.cos.ap-beijing.myqcloud.com/%E5%8E%86%E4%BB%BB%E7%A4%BE%E9%95%BF/%E5%B0%8F%E5%B0%8F%E7%BA%A2.jpg'
            },
            {
                name: '2016届社长——左哥', photo: 'https://skating-1256514671.cos.ap-beijing.myqcloud.com/%E5%8E%86%E4%BB%BB%E7%A4%BE%E9%95%BF/%E5%B7%A6%E5%93%A5.jpg'
            },
            {
                name: '2017届社长——咸鱼', photo: 'https://skating-1256514671.cos.ap-beijing.myqcloud.com/%E5%8E%86%E4%BB%BB%E7%A4%BE%E9%95%BF/%E5%92%B8%E9%B1%BC.jpg'
            }
        ],
        index: 0,
    },
    changename(event) {
        this.setData({
            index: event.detail.current
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return {
            title: '风影简介',
            path: '/pages/skate/abstract'
        }
    }
})