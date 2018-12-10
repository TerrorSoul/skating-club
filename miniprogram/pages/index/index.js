//index.js
var demoSdk = require('../../demo-sdk');
const config = {
    host: 'www.nevermore.wang',
    Bucket: 'activities-1256514671',
    Region: 'ap-beijing',
};
var app = getApp();
var appConfig = app.config;

Page({
    data: {
        screenHeight: '',
    },
    showActivities() {
        wx.navigateTo({
            url: '/pages/activities/activities',
        })
    },
    joinus() {
        wx.navigateTo({
            url: '/pages/skate/join',
        })
    },
    playfangkuai() {
        wx.navigateTo({
            url: '/pages/fangkuai/fangkuai',
        })
    },
    showAlbum() {
        wx.navigateTo({
            url: '/pages/album/albums',
        })
    },
    buyshoe() {
        wx.navigateTo({
            url: '/pages/shoe/shoe',
        })
    },
    onLoad: function () {
        wx.cloud.init()
        const screenHeight = wx.getSystemInfoSync().windowHeight;
        this.setData({
            screenHeight: screenHeight,
        })
        var that = this;
        wx.cloud.callFunction({
            name: 'login',
            success: function(res) {
                appConfig.minister = res.result;
                that.setData({
                    minister: res.result,
                })
            }
        })
    },
    onShareAppMessage: function() {
        return {
            title: '风影轮滑社',
            path: '/pages/index/index',
            imageUrl: 'https://skating-1256514671.cos.ap-beijing.myqcloud.com/%E9%A3%8E%E5%BD%B1%E6%A0%87%E5%BF%97.jpg'
        }
    }
})