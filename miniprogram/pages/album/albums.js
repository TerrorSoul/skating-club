// pages/album/albums.js
var demoSdk = require('../../demo-sdk');
const config = {
    host: 'www.nevermore.wang',
    Bucket: 'album-1256514671',
    Region: 'ap-beijing',
};
var app = getApp();
var appConfig = app.config;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        albums: [],
        addAlbum: false,
    },
    showAlbum: function(event) {
        var index = event.currentTarget.dataset.index;
        var albums = this.data.albums;
        var name = albums[index].name;
        wx.navigateTo({
            url: 'album?name=' + name,
        })
    },
    addAlbum: function() {
        this.setData({
            addAlbum: true,
        })
    },
    cancel: function() {
        this.setData({
            addAlbum: false,
        })
    },
    confirm: function() {
        var name = this.data.name;
        var albums = this.data.albums;
        var that = this;
        this.setData({
            addAlbum: false,
        })
        var getUrl = function(err, data) {
            if (err) {
                console.log(err);
            } else {
                albums.push({
                    name: name,
                    cover: data.Location.replace(/cos.ap-beijing/, "file")
                });
                that.setData({
                    albums: albums
                })
            }
        };
        demoSdk.postObject(1, ['compressed'], name, config.Bucket, config.Region, getUrl);
    },
    getname: function(event) {
        this.setData({
            name: event.detail.value,
        })
    },
    getAlbums: function() {
        var that = this;
        var albumNames = function(err, data) {
            if (err) {
                console.log(err);
            } else {
                var contents = data.Contents;
                var cover_key = [];
                for (var i = 0; i < contents.length; i++) {
                    var key = contents[i].Key;
                    if (key.lastIndexOf('/') + 1 < key.length && key.lastIndexOf('/') == key.indexOf('/')) {
                        cover_key.push(key);
                    }
                }
                var albums = cover_key.map(function(Key, index) {
                    return {
                        name: cover_key[index].slice(0, cover_key[index].indexOf('/')),
                        cover: demoSdk.getObjectUrl(config.Bucket, config.Region, Key).replace(/cos.ap-beijing/, "file"),
                    }
                });
                that.setData({
                    albums: albums,
                })
            }
        };
        demoSdk.getBucket(config.Bucket, config.Region, '', albumNames);
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getAlbums();
        const windowWidth = wx.getSystemInfoSync().windowWidth;
        var width = (windowWidth - 30) / 2;
        this.setData({
            width: width,
            minister: appConfig.minister,
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
            title: '风影相册',
            path: '/pages/album/albums',
        }
    }
})