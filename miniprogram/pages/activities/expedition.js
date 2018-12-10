// pages/activities/yuanzheng.js
var sdk = require('activitiesSdk.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        activityindex: 0,
        item: {
            actions: [{
                    name: '青海湖',
                    typename: 'primary',
                    index: 0,
                },
                {
                    name: '内蒙古',
                    typename: 'default',
                    index: 1,
                }
            ]
        },
        activitykind: [{
                na: 'qinghai',
                illustration: '青青青海海海湖湖湖',
                addition: '青海美食、茶卡盐湖、盐雕、跳山羊'
            },
            {
                na: 'neimeng',
                illustration: '今年的远征地点——内蒙古了解一下。',
                addition: '图文无关图文无关！'
            },
        ],
    },
    changeactivity(event) {
        const length = this.data.item.actions.length;
        var index = event.currentTarget.dataset.index;
        var actions = this.data.item.actions;
        for (let i = 0; i < length; ++i) {
            if (actions[i].index != index) {
                actions[i].typename = 'default';
            } else {
                actions[i].typename = 'primary';
            }
        }
        this.setData({
            item: {
                actions: actions
            },
            activityindex: index
        })
        var activitykind = this.data.activitykind;
        var activityindex = this.data.activityindex;
        var na = activitykind[activityindex].na;
        var Prefix = 'expedition/' + na + '/';
        sdk.getBucket(Prefix, this.getBucket);
    },
    preimage(event) {
        var index = event.currentTarget.dataset.index;
        wx.previewImage({
            current: this.data.activitykind[this.data.activityindex].photos[index],
            urls: this.data.activitykind[this.data.activityindex].photos,
        })
    },
    getBucket: function (photo) {
        var activitykind = this.data.activitykind;
        var activityindex = this.data.activityindex;
        activitykind[activityindex].photos = photo;
        this.setData({
            activitykind: activitykind,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        var activitykind = this.data.activitykind;
        var activityindex = this.data.activityindex;
        var na = activitykind[activityindex].na;
        var Prefix = 'expedition/' + na + '/';
        sdk.getBucket(Prefix, this.getBucket);
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
            title: '暑期远征',
            path: '/pages/activities/expedition'
        }
    }
})