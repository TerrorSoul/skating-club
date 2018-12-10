var demoSdk = require('../../demo-sdk');
const config = {
    host: 'www.nevermore.wang',
    Bucket: 'activities-1256514671',
    Region: 'ap-beijing',
};
var app = getApp();
var appConfig = app.config;

var getBucket = function (Prefix, callBack) {
    demoSdk.getBucket(config.Bucket, config.Region, Prefix, function(err, data) {
        if(err) {
            console.log(err);
        }
        else {
            var Contents = data.Contents;
            var Keys = [];
            Contents.forEach(function(Content) {
                var Key = Content.Key;
                if(Key.lastIndexOf('/') + 1 < Key.length) {
                    Keys.push(Key);
                }
            })
            var photo = Keys.map(function(Key) {
                return {
                    name: Key.slice(Key.lastIndexOf('/') + 1, Key.lastIndexOf('.')),
                    url: demoSdk.getObjectUrl(config.Bucket, config.Region, Key),
                }
            })
            callBack(photo);
        }
    });
};
var activitiesSdk = {
    getBucket: getBucket,
};

module.exports = activitiesSdk;