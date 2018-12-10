// pages/activities/wonderfulactivity.js
var sdk = require('activitiesSdk.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        activityindex: 0,
        item: {
            actions: [{
                    name: '夜刷十三陵',
                    typename: 'primary',
                    index: 0,
                },
                {
                    name: '五一北戴河',
                    typename: 'default',
                    index: 1,
                }
            ]
        },
        activitykind: [{
                na: 'shisanling',
                illustration: '陵墓？为什么会有陵墓这个词出现？这可能是你见到第一个想问的。本着“ 带你见世面”的宗旨，每到清明节，万圣节前夕，我们都会去那里故地重游。',
                addition: '故地重游？这可能是你见到第二个想问的。其实十三陵是一个大的景区，关于帝王陵墓只是一个很小的部分。借着景区的光环，环境很不错。每年我们都会带着烧烤，游戏卡牌，穿着轮滑鞋，去那里秋游春游，呼吸大自然的气息。'
            },
            {
                na: 'beidaihe',
                illustration: '五一假期，轮滑社的活动依旧不断。北戴河的国际轮滑节，也是轮滑社的例行项目之一。',
                addition: '这次我们要和几千人一起进行轮滑刷街，你可以试想下，那时候会有多热闹，晚上舒服的海风、美味的海鲜、浪拍沙滩的声音以及好友们谈天谈地，美好的假期不过如此。'
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
        var Prefix = 'festivalactivities/' + na + '/';
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
        var Prefix = 'festivalactivities/' + na + '/';
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
            title: '节日活动',
            path: '/pages/activities/festivalactivities'
        }
    }
})