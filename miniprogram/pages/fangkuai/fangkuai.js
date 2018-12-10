// pages/fangkuai/fangkuai.js
const fangkuai = wx.createCanvasContext('fangkuai');
var common = require('common.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        curSpeed: 1,
        curScore: 0,
        maxScore: 0,
        width: 300,
        height: 300,
        leftPlain: false,
        rotatePlain: false,
        rightPlain: false,
        bottomPlain: false,
        controlType: 'primary',
        cols: 18,
        rows: 20,
        blockArr: [
            [
                { x: 6, y: 0, color: 1 },
                { x: 7, y: 0, color: 1 },
                { x: 7, y: 1, color: 1 },
                { x: 8, y: 1, color: 1 },
            ],
            [
                { x: 8, y: 0, color: 2 },
                { x: 7, y: 0, color: 2 },
                { x: 7, y: 1, color: 2 },
                { x: 6, y: 1, color: 2 },
            ],
            [
                { x: 6, y: 0, color: 3 },
                { x: 7, y: 0, color: 3 },
                { x: 6, y: 1, color: 3 },
                { x: 7, y: 1, color: 3 },
            ],
            [
                { x: 6, y: 0, color: 4 },
                { x: 6, y: 1, color: 4 },
                { x: 6, y: 2, color: 4 },
                { x: 7, y: 2, color: 4 },
            ],
            [
                { x: 7, y: 0, color: 5 },
                { x: 7, y: 1, color: 5 },
                { x: 7, y: 2, color: 5 },
                { x: 6, y: 2, color: 5 },
            ],
            [
                { x: 7, y: 0, color: 6 },
                { x: 7, y: 1, color: 6 },
                { x: 7, y: 2, color: 6 },
                { x: 7, y: 3, color: 6 },
            ],
            [
                { x: 7, y: 0, color: 7 },
                { x: 6, y: 1, color: 7 },
                { x: 7, y: 1, color: 7 },
                { x: 8, y: 1, color: 7 },
            ],
        ],
        colors: [
            '',
            'Aqua',
            'Black',
            'CadetBlue',
            'DarkBlue',
            'FireBrick',
            'Gold',
            'HotPink',
        ],
        timer: '',
        goTimer: '',
        status: [],
        currentFall: [],
        currentIndex: 0,
        minHeight: Number.MAX_VALUE,
        minLeft: Number.MAX_VALUE,
        minRight: Number.MAX_VALUE,
        cell_size: 0,
        isPlaying: false,
        isGaming: false,
        death: true,
    },
    toLeftPlain() {
        this.setData({
            leftPlain: true,
        })
    },
    toRotatePlain() {
        this.setData({
            rotatePlain: true,
        })
    },
    toRightPlain() {
        this.setData({
            rightPlain: true,
        })
    },
    toBottomPlain() {
        this.setData({
            bottomPlain: true,
        })
    },
    begingame() {
        if (!this.data.isPlaying) {
            this.setData({
                isPlaying: true,
                isGaming: true,
            })
            var status = [];
            for (var i = 0; i < this.data.rows; ++i) {
                status[i] = [];
                for (var j = 0; j < this.data.cols; ++j) {
                    status[i][j] = 0;
                }
            }
            this.drawLine();
            fangkuai.draw();
            this.initBlock();
            clearInterval(this.data.timer);
            this.setData({
                timer: setInterval(this.moveDown, 500),
                status: status,
                curSpeed: 1,
                curScore: 0,
                leftPlain: false,
                rotatePlain: false,
                rightPlain: false,
                bottomPlain: false,
                controlType: 'primary',
            })
            var maxScore = wx.getStorageSync('max');
            if (maxScore > this.data.maxScore) {
                this.setData({
                    maxScore: maxScore,
                })
            }
        }
    },
    drawLine() {
        const cols = this.data.cols;
        const rows = this.data.rows;
        const cell_size = this.data.cell_size;
        fangkuai.beginPath();
        for (var i = 1; i < rows; ++i) {
            fangkuai.moveTo(0, i * cell_size);
            fangkuai.lineTo(this.data.width, i * cell_size);
        }
        for (var i = 1; i < cols; ++i) {
            fangkuai.moveTo(i * cell_size, 0);
            fangkuai.lineTo(i * cell_size, this.data.height);
        }
        fangkuai.closePath();
        fangkuai.setStrokeStyle('#aaa');
        fangkuai.setLineWidth(0.3);
        fangkuai.stroke();
    },
    initBlock() {
        var rand = Math.floor(Math.random() * this.data.blockArr.length);
        var currentFall = [
            { x: this.data.blockArr[rand][0].x, y: this.data.blockArr[rand][0].y, color: this.data.blockArr[rand][0].color },
            { x: this.data.blockArr[rand][1].x, y: this.data.blockArr[rand][1].y, color: this.data.blockArr[rand][1].color },
            { x: this.data.blockArr[rand][2].x, y: this.data.blockArr[rand][2].y, color: this.data.blockArr[rand][2].color },
            { x: this.data.blockArr[rand][3].x, y: this.data.blockArr[rand][3].y, color: this.data.blockArr[rand][3].color },
        ];
        this.setData({
            currentFall: currentFall,
            currentIndex: rand + 1,
            minHeight: Number.MAX_VALUE,
        })
    },
    lineFull() {
        const cols = this.data.cols;
        const rows = this.data.rows;
        var status = this.data.status;
        const cell_size = this.data.cell_size;
        for (var i = 0; i < rows; ++i) {
            var flag = true;
            for (var j = 0; j < cols; ++j) {
                if (status[i][j] == 0) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                var curScore = this.data.curScore + 100 * this.data.curSpeed;
                this.setData({
                    curScore: curScore,
                })
                if (this.data.curScore >= this.data.curSpeed * this.data.curSpeed * 500) {
                    var curSpeed = this.data.curSpeed + 1;
                    this.setData({
                        curSpeed: curSpeed,
                    })
                    clearInterval(this.data.timer);
                    var interval = 500 - 100 * Math.log(curSpeed);
                    if (interval < 50) {
                        interval = 50;
                    }
                    this.setData({
                        timer: setInterval(this.moveDown, interval),
                    })
                }
                for (var k = i; k > 0; --k) {
                    for (var l = 0; l < cols; ++l) {
                        status[k][l] = status[k - 1][l];
                    }
                }
                this.setData({
                    status: status,
                })
            }
        }
        this.drawLine();
        this.drawBlock();
        fangkuai.draw();
    },
    drawBlock() {
        const cols = this.data.cols;
        const rows = this.data.rows;
        const cell_size = this.data.cell_size;
        const status = this.data.status;
        for (var i = 0; i < rows; ++i) {
            for (var j = 0; j < cols; ++j) {
                if (status[i][j] != 0) {
                    fangkuai.setFillStyle(this.data.colors[status[i][j]]);
                    fangkuai.fillRect(j * cell_size + 0.7, i * cell_size + 0.7, cell_size - 1.4, cell_size - 1.4);
                }
            }
        }
    },
    draw(type) {
        const cell_size = this.data.cell_size;
        var currentFall = this.data.currentFall;
        for (var i = 0; i < currentFall.length; ++i) {
            var cur = currentFall[i];
            fangkuai.setFillStyle('#ffffff');
            fangkuai.fillRect(cur.x * cell_size + 0.5, cur.y * cell_size + 0.5, cell_size - 1, cell_size - 1);
        }
        switch (type) {
            case 0:
                for (var i = 0; i < currentFall.length; ++i) {
                    var cur = currentFall[i];
                    ++cur.y;
                }
                break;
            case 1:
                for (var i = 0; i < currentFall.length; ++i) {
                    var cur = currentFall[i];
                    --cur.x;
                }
                break;
            case 2:
                for (var i = 0; i < currentFall.length; ++i) {
                    var cur = currentFall[i];
                    ++cur.x;
                }
                break;
            case 3:
                for (var i = 0; i < currentFall.length; ++i) {
                    var preX = currentFall[i].x;
                    var preY = currentFall[i].y;
                    if (i != 2) {
                        currentFall[i].x = currentFall[2].x - preY + currentFall[2].y;
                        currentFall[i].y = currentFall[2].y + preX - currentFall[2].x;
                    }
                }
                break;
            case 4:
                var minHeight = this.data.minHeight;
                for (var i = 0; i < currentFall.length; ++i) {
                    var cur = currentFall[i];
                    cur.y += minHeight;
                }
                break;
            case 5:
                var minLeft = this.data.minLeft;
                for (var i = 0; i < currentFall.length; ++i) {
                    var cur = currentFall[i];
                    cur.x -= minLeft;
                }
                break;
            case 6:
                var minRight = this.data.minRight;
                for (var i = 0; i < currentFall.length; ++i) {
                    var cur = currentFall[i];
                    cur.x += minRight;
                }
                break;
        }
        this.setData({
            currentFall: currentFall,
        })
        for (var i = 0; i < currentFall.length; ++i) {
            var cur = currentFall[i];
            fangkuai.setFillStyle(this.data.colors[cur.color]);
            fangkuai.fillRect(cur.x * cell_size + 0.7, cur.y * cell_size + 0.7, cell_size - 1.4, cell_size - 1.4);
        }
        fangkuai.draw(true);
    },
    moveDown() {
        if (this.data.isPlaying) {
            const cols = this.data.cols;
            const rows = this.data.rows;
            var currentFall = this.data.currentFall;
            var status = this.data.status;
            const cell_size = this.data.cell_size;
            var canDown = true;
            for (var i = 0; i < currentFall.length; ++i) {
                if (currentFall[i].y >= rows - 1) {
                    canDown = false;
                    break;
                }
                if (status[currentFall[i].y + 1][currentFall[i].x] != 0) {
                    canDown = false;
                    break;
                }
            }
            if (canDown) {
                this.draw(0);
            }
            else {
                for (var i = 0; i < currentFall.length; ++i) {
                    var cur = currentFall[i];
                    if (cur.y < 2) {
                        this.setData({
                            isPlaying: false,
                            controlType: 'default',
                        })
                        clearInterval(this.data.timer);
                        fangkuai.save();
                        fangkuai.setShadow(5, 5, 10, 'black');
                        fangkuai.setFontSize(30);
                        fangkuai.setTextAlign('center');
                        fangkuai.setTextBaseline('bottom');
                        fangkuai.fillText('Game Over', this.data.width / 2, this.data.height / 2);
                        fangkuai.setTextBaseline('top');
                        fangkuai.fillText('长按重玩', this.data.width / 2, this.data.height / 2);
                        fangkuai.restore();
                        fangkuai.draw(true);
                        wx.vibrateLong({

                        })
                        if (this.data.curScore > this.data.maxScore) {
                            wx.setStorageSync('max', this.data.curScore)
                        }
                        return;
                    }
                    status[cur.y][cur.x] = cur.color;
                }
                this.setData({
                    status: status,
                })
                this.lineFull();
                this.initBlock();
            }
        }
    },
    moveLeft(event) {
        var currentFall = this.data.currentFall;
        var status = this.data.status;
        if (common.canLeft(currentFall, status)) {
            this.draw(1);
        }
        this.setData({
            leftPlain: false,
        })
        wx.vibrateShort({

        })
    },
    goLeft() {
        this.setData({
            goTimer: setInterval(this.moveLeft, 100),
        })
    },
    noLeft() {
        clearInterval(this.data.goTimer);
    },
    moveRight() {
        var currentFall = this.data.currentFall;
        var status = this.data.status;
        const cols = this.data.cols;
        if (common.canRight(currentFall, status, cols)) {
            this.draw(2);
        }
        this.setData({
            rightPlain: false,
        })
        wx.vibrateShort({

        })
    },
    goRight() {
        this.setData({
            goTimer: setInterval(this.moveRight, 100),
        })
    },
    noRight() {
        clearInterval(this.data.goTimer);
    },
    rotate() {
        var currentFall = this.data.currentFall;
        const status = this.data.status;
        const cols = this.data.cols;
        var canRotate = true;
        if (this.data.currentIndex == 3) {
            canRotate = false;
        }
        else {
            for (var i = 0; i < currentFall.length; ++i) {
                var preX = currentFall[i].x;
                var preY = currentFall[i].y;
                if (i != 2) {
                    var afterRotateX = currentFall[2].x - preY + currentFall[2].y;
                    var afterRotateY = currentFall[2].y + preX - currentFall[2].x;
                    if (status[afterRotateY][afterRotateX] != 0) {
                        canRotate = false;
                        break;
                    }
                    if (afterRotateX < 0 || status[afterRotateY][afterRotateX - 1] != 0) {
                        this.moveRight();
                        currentFall = this.data.currentFall;
                        preX = currentFall[i].x;
                        preY = currentFall[i].y;
                        afterRotateX = currentFall[2].x - preY + currentFall[2].y;
                        afterRotateY = currentFall[2].y + preX - currentFall[2].x;
                        break;
                    }
                    if (afterRotateX >= cols || status[afterRotateY][afterRotateX + 1] != 0) {
                        this.moveLeft();
                        currentFall = this.data.currentFall;
                        preX = currentFall[i].x;
                        preY = currentFall[i].y;
                        afterRotateX = currentFall[2].x - preY + currentFall[2].y;
                        afterRotateY = currentFall[2].y + preX - currentFall[2].x;
                        break;
                    }
                }
            }
        }
        if (canRotate) {
            this.draw(3);
        }
        this.setData({
            rotatePlain: false,
        })
        wx.vibrateShort({

        })
    },
    goRotate() {
        this.setData({
            goTimer: setInterval(this.rotate, 100),
        })
    },
    noRotate() {
        clearInterval(this.data.goTimer);
    },
    goBottom() {
        const currentFall = this.data.currentFall;
        this.setData({
            currentFall: currentFall,
        })
        const status = this.data.status;
        const rows = this.data.rows;
        var blockBottom = common.blockBottom(currentFall);
        var minHeight = common.minHeight(blockBottom, status, rows);
        this.setData({
            minHeight: minHeight,
        })
        this.draw(4);
        this.setData({
            bottomPlain: false,
        })
        wx.vibrateShort({

        })
    },
    clearStorage() {
        wx.clearStorage();
    },
    toAside(event) {
        const currentFall = this.data.currentFall;
        this.setData({
            currentFall: currentFall,
        })
        const status = this.data.status;
        if (event.touches[0].clientX < this.data.width / 2) {
            var blockLeft = common.blockLeft(currentFall);
            var minLeft = common.minLeft(blockLeft, status);
            this.setData({
                minLeft: minLeft,
            })
            this.draw(5);
        }
        else {
            const cols = this.data.cols;
            var blockRight = common.blockRight(currentFall);
            var minRight = common.minRight(blockRight, status, cols);
            this.setData({
                minRight: minRight,
            })
            this.draw(6);
        }
        wx.vibrateShort({

        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const cols = this.data.cols;
        const rows = this.data.rows;
        const width = wx.getSystemInfoSync().windowWidth;
        this.setData({
            width: width,
            height: rows / cols * width,
            cell_size: width / cols,
        })
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

    }
})