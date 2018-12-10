// pages/activities/日常活动.js
var sdk = require('activitiesSdk.js')

Page({
    /**
     * 页面的初始数据
     */
    data: {
        activityindex: 0,
        item: {
            actions: [{
                    name: '八点博学',
                    typename: 'primary',
                    index: 0,
                },
                {
                    name: '周五刷街',
                    typename: 'default',
                    index: 1,
                }
            ]
        },
        activitykind: [{
                na: 'boxue',
                illustration: '每晚的在对外经济贸易大学博学楼的门前，都有一群穿着轮滑鞋，或聊天、或耍帅、或过桩练习轮滑动作的人儿。',
                addition: '这是轮滑社的常规活动地点，也是你与学长学姐交流的地方。你不仅可以询问轮滑社的历史，也可以请教贸大趣闻，选课指南等等。多种答案，就等你来。'
            },
            {
                na: 'shuajie',
                illustration: '这是解锁你的第一次疯狂轮滑之旅钥匙，如果你想要用轮滑丈量北京的大街小巷，如果你想体验大学的激情，如果你想遇到志同道合的朋友，刷街纷纷满足你的需求，鸟巢、水立方、天安门、后海、798、南锣锅巷、世贸天阶。春夏秋冬四季，轮滑社陪你四季。',
                addition: '刷街可是难得的锻炼滑行的机会哦，刷一次街比在博学练一个礼拜都强。'
            },
        ],
    },
    changeactivity(event) {
        const length = this.data.item.actions.length;
        var index = event.currentTarget.dataset.index;
        var actions = this.data.item.actions;
        var activitykind = this.data.activitykind;
        activitykind[index].index = 0;
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
            activityindex: index,
            activitykind: activitykind,
        })
        var activitykind = this.data.activitykind;
        if(!activitykind[index].photos) {
            var na = activitykind[index].na;
            var Prefix = 'dailyactivities/' + na + '/';
            sdk.getBucket(Prefix, this.getBucket);
        }
    },
    preimage(event) {
        var index = event.currentTarget.dataset.index;
        wx.previewImage({
            current: this.data.activitykind[this.data.activityindex].photos[index],
            urls: this.data.activitykind[this.data.activityindex].photos,
        })
    },
    getBucket: function(photo) {
        var activitykind = this.data.activitykind;
        var activityindex = this.data.activityindex;
        activitykind[activityindex].photos = photo;
        activitykind[activityindex].index = 0;
        this.setData({
            activitykind: activitykind,
        })
    },
    changeplace: function(event) {
        var activitykind = this.data.activitykind;
        var activityindex = this.data.activityindex;
        activitykind[activityindex].index = event.detail.current;
        this.setData({
            activitykind: activitykind,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function() {
        var activitykind = this.data.activitykind;
        var activityindex = this.data.activityindex;
        var na = activitykind[activityindex].na;
        var Prefix = 'dailyactivities/' + na + '/';
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
    onPullDownRefresh: function() {},

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
            title: '日常活动',
            path: '/pages/activities/dailyactivities'
        }
    }
})