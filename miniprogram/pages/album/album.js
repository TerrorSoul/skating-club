// pages/album/album.js
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
        mcSrc: 'https://skating-1256514671.cos.ap-beijing.myqcloud.com/icon/manage.svg',
        album: [],
        controlAlbum: false,
        name: '',
    },
    preimage(event) {
        var index = event.currentTarget.dataset.index;
        var timeindex = event.currentTarget.dataset.timeindex;
        wx.previewImage({
            current: this.data.album[timeindex].urls[index],
            urls: this.data.album[timeindex].urls,
        })
    },
    controlImages(event) {
        var timeindex = event.currentTarget.dataset.timeindex;
        var album = this.data.album;
        if (album[timeindex].controlImages) {
            album[timeindex].controlImages = false;
            album[timeindex].mcSrc = 'https://skating-1256514671.cos.ap-beijing.myqcloud.com/icon/cancel.svg';
        } else {
            album[timeindex].controlImages = true;
            album[timeindex].mcSrc = 'https://skating-1256514671.cos.ap-beijing.myqcloud.com/icon/manage.svg';
        }
        this.setData({
            album: album,
        })
    },
    postObject: function(event) {
        var timeindex = event.currentTarget.dataset.timeindex;
        var album = this.data.album;
        var time = album[timeindex].time;
        var name = this.data.name;
        var that = this;
        var getUrl = function(err, data) {
            if (err) {
                console.log(err);
            } else {
                album[timeindex].urls.push(data.Location.replace(/cos.ap-beijing/, "file"));
                album[timeindex].iconType.push('clear');
                that.setData({
                    album: album,
                })
            }
        }
        demoSdk.postObject(9, ['original'], name + '/' + time, config.Bucket, config.Region, getUrl);
    },
    deleteImage: function(event) {
        var album = this.data.album;
        var timeindex = event.currentTarget.dataset.timeindex;
        var deleteUrl = [];
        for (var i = 0; i < album[timeindex].iconType.length; ++i) {
            if (album[timeindex].iconType[i] == 'success') {
                deleteUrl.push(album[timeindex].urls.splice(i, 1)[0]);
                album[timeindex].iconType.splice(i, 1);
                i--;
            }
        }
        album[timeindex].controlImages = true;
        album[timeindex].mcSrc = 'https://skating-1256514671.cos.ap-beijing.myqcloud.com/icon/manage.svg';
        this.setData({
            album: album,
        })
        var Objects = deleteUrl.map(function (url) {
            return {
                Key: decodeURI(url.slice(43))
            }
        })
        demoSdk.deleteMultipleObject(config.Bucket, config.Region, Objects);
    },
    editIcon: function(event) {
        var timeindex = event.currentTarget.dataset.timeindex;
        var index = event.currentTarget.dataset.index;
        var album = this.data.album;
        album[timeindex].iconType[index] =
            album[timeindex].iconType[index] == 'clear' ? 'success' : 'clear';
        this.setData({
            album: album,
        })
    },
    showTime: function(time) {
        var date = new Date();
        var currentYear = date.getFullYear();
        var year = time.substr(0, 4);
        var month = time.substr(5, 2);
        var day = time.substr(8, 2);
        var showTime;
        if (currentYear > parseInt(year)) {
            showTime = year + '年' + month + '月' + day + '日';
        } else {
            showTime = month + '月' + day + '日';
        }
        return showTime;
    },
    sortAlbum: function(album, p, r) {
        var partition = function(start, end) {
            var timenum = function(time) {
                return parseInt(time.substr(0, 4) + time.substr(5, 2) + time.substr(8, 2));
            }
            var x = timenum(album[end].time);
            var i = start - 1;
            for (var j = start; j <= end - 1; j++) {
                if (timenum(album[j].time) >= x) {
                    i++;
                    var temp = album[i];
                    album[i] = album[j];
                    album[j] = temp;
                }
            }
            temp = album[i + 1];
            album[i + 1] = album[end];
            album[end] = temp;
            return i + 1;
        }
        if (p < r) {
            var q = partition(p, r);
            this.sortAlbum(album, p, q - 1);
            this.sortAlbum(album, q + 1, r);
            return album;
        } else {
            return album;
        }
    },
    getAlbum: function(name) {
        var name = this.data.name;
        var that = this;
        var albumNames = function(err, data) {
            if (err) {
                console.log(err);
            } else {
                var contents = data.Contents;
                var Keys = [];
                for (var i = 0; i < contents.length; i++) {
                    var Key = contents[i].Key;
                    if (Key.lastIndexOf('/') + 1 < Key.length && Key.lastIndexOf('/') != Key.indexOf('/')) {
                        Keys.push(Key);
                    }
                }
                var album = [];
                Keys.forEach(function(Key) {
                    var time = Key.substr(Key.indexOf('/') + 1, 10);
                    for (var i = 0; i < album.length; i++) {
                        if (album[i].time == time) {
                            album[i].urls.push(demoSdk.getObjectUrl(config.Bucket, config.Region, Key).replace(/cos.ap-beijing/, "file"));
                            album[i].iconType.push('clear');
                            break;
                        }
                    }
                    if (i == album.length) {
                        album.push({
                            time: time,
                            showTime: that.showTime(time),
                            urls: [demoSdk.getObjectUrl(config.Bucket, config.Region, Key).replace(/cos.ap-beijing/, "file")],
                            iconType: ['clear'],
                            controlImages: true,
                            mcSrc: 'https://skating-1256514671.cos.ap-beijing.myqcloud.com/icon/manage.svg',
                        })
                    }
                })
                var controlAlbums = [];
                for (var j = 0; j < album.length; j++) {
                    controlAlbums.push('clear');
                }
                album = that.sortAlbum(album, 0, album.length - 1);
                that.setData({
                    album: album,
                    controlAlbums: controlAlbums,
                });
            }
        };
        demoSdk.getBucket(config.Bucket, config.Region, name, albumNames);
    },
    addAlbum: function(event) {
        var album = this.data.album;
        var time = event.detail.value;
        var controlAlbums = this.data.controlAlbums;
        var name = this.data.name;
        var that = this;
        var exists = true;
        for (var i = 0; i < album.length; ++i) {
            if (album[i].time == time) {
                exists = false;
                break;
            }
        }
        if (exists) {
            wx.showModal({
                title: '新建相册',
                content: time,
                confirmText: '上传照片',
                success: function(res) {
                    if (res.confirm) {
                        var showTime = that.showTime(time);
                        album.push({
                            time: time,
                            showTime: showTime,
                            urls: [],
                            iconType: [],
                            controlImages: true,
                            mcSrc: 'https://skating-1256514671.cos.ap-beijing.myqcloud.com/icon/manage.svg',
                        })
                        controlAlbums.push('clear');
                        album = that.sortAlbum(album, 0, album.length - 1);
                        that.setData({
                            album: album,
                            controlAlbums: controlAlbums
                        })
                        for (var j = 0; j < album.length; j++) {
                            if (album[j].time == time) {
                                break;
                            }
                        }
                        var getUrl = function(err, data) {
                            if (err) {
                                console.log(err);
                            } else {
                                album[j].urls.push(data.Location.replace(/cos.ap-beijing/, "file"));
                                album[j].iconType.push('clear');
                                that.setData({
                                    album: album
                                })
                            }
                        };
                        demoSdk.postObject(9, ['original'], name + '/' + time, config.Bucket, config.Region, getUrl);
                    }
                }
            })
        } else {
            wx.showToast({
                title: '相册已存在',
                icon: 'none',
            })
        }
    },
    controlAlbum: function(event) {
        var timeindex = event.currentTarget.dataset.timeindex;
        var controlAlbums = this.data.controlAlbums;
        if (controlAlbums[timeindex] == 'clear') {
            controlAlbums[timeindex] = 'success'
            this.setData({
                controlAlbums: controlAlbums,
            });
        } else {
            controlAlbums[timeindex] = 'clear'
            this.setData({
                controlAlbums: controlAlbums,
            });
        }
    },
    deleteAlbum: function() {
        var controlAlbum = this.data.controlAlbum;
        var controlAlbums = this.data.controlAlbums;
        var album = this.data.album;
        var that = this;
        if (controlAlbum) {
            that.setData({
                controlAlbum: false,
            })
            var deleteAlbums = [];
            for (var i = 0; i < controlAlbums.length; ++i) {
                if (controlAlbums[i] == 'success') {
                    deleteAlbums.push(album.splice(i, 1)[0].urls);
                    controlAlbums.splice(i, 1);
                    i--;
                }
            }
            if (deleteAlbums.length > 0) {
                wx.showModal({
                    title: '删除相册',
                    content: '包括其中的所有照片',
                    success: function(res) {
                        if (res.confirm) {
                            that.setData({
                                album: album,
                                controlAlbums: controlAlbums,
                            })
                            deleteAlbums.forEach(function(deleteAlbum) {
                                var Objects = deleteAlbum.map(function(url) {
                                    return {
                                        Key: decodeURI(url.slice(43))
                                    }
                                })
                                demoSdk.deleteMultipleObject(config.Bucket, config.Region, Objects);
                            })
                        }
                    }
                })
            }
        } else {
            this.setData({
                controlAlbum: true,
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var name = options.name;
        const windowWidth = wx.getSystemInfoSync().windowWidth;
        const windowHeight = wx.getSystemInfoSync().windowHeight;
        var length = (windowWidth - 10) / 3;
        this.setData({
            length: length,
            height: windowHeight,
            name: name,
            minister: appConfig.minister,
        })
        wx.setNavigationBarTitle({
            title: name
        })
        this.getAlbum(name);
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
        var name = this.data.name;
        return {
            title: name,
            path: '/pages/album/album',
        }
    }
})