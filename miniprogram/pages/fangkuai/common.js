var canLeft = function(currentFall, status) {
    var canLeft = true;
    for (var i = 0; i < currentFall.length; ++i) {
        if (currentFall[i].x <= 0) {
            canLeft = false;
            break;
        }
        if (status[currentFall[i].y][currentFall[i].x - 1] != 0) {
            canLeft = false;
            break;
        }
    }
    return canLeft;
}

var canRight = function(currentFall, status, cols) {
    var canRight = true;
    for (var i = 0; i < currentFall.length; ++i) {
        if (currentFall[i].x >= cols - 1) {
            canRight = false;
            break;
        }
        if (status[currentFall[i].y][currentFall[i].x + 1] != 0) {
            canRight = false;
            break;
        }
    }
    return canRight;
}

var blockLeft = function(currentFall) {
    var blockLeft = [];
    for (var i = 0; i < currentFall.length; ++i) {
        const cur = currentFall[i];
        var inBlock = true;
        if (blockLeft.length == 0) {
            blockLeft[0] = cur;
            continue;
        }
        for (var j = 0; j < blockLeft.length; ++j) {
            if (blockLeft[j].y == cur.y) {
                blockLeft[j].x = Math.min(blockLeft[j].x, cur.x);
                inBlock = false;
                break;
            }
        }
        if (inBlock) {
            blockLeft[blockLeft.length] = cur;
        }
    }
    return blockLeft;
}

var blockRight = function(currentFall) {
    var blockRight = [];
    for (var i = 0; i < currentFall.length; ++i) {
        const cur = currentFall[i];
        var inBlock = true;
        if (blockRight.length == 0) {
            blockRight[0] = cur;
            continue;
        }
        for (var j = 0; j < blockRight.length; ++j) {
            if (blockRight[j].y == cur.y) {
                blockRight[j].x = Math.max(blockRight[j].x, cur.x);
                inBlock = false;
                break;
            }
        }
        if (inBlock) {
            blockRight[blockRight.length] = cur;
        }
    }
    return blockRight;
}

var blockBottom = function(currentFall) {
    var blockBottom = [];
    for (var i = 0; i < currentFall.length; ++i) {
        const cur = currentFall[i];
        var inBlock = true;
        if (blockBottom.length == 0) {
            blockBottom[0] = cur;
            continue;
        }
        for (var j = 0; j < blockBottom.length; ++j) {
            if (blockBottom[j].x == cur.x) {
                blockBottom[j].y = Math.max(blockBottom[j].y, cur.y);
                inBlock = false;
                break;
            }
        }
        if (inBlock) {
            blockBottom[blockBottom.length] = cur;
        }
    }
    return blockBottom;
}

var minHeight = function(blockBottom, status, rows) {
    var minHeight = Number.MAX_VALUE;
    var currentHeight = 0;
    for (var i = 0; i < blockBottom.length; ++i) {
        for (var j = blockBottom[i].y + 1; j < rows; ++j) {
            if (status[j][blockBottom[i].x] == 0) {
                ++currentHeight;
            }
            else {
                break;
            }
        }
        minHeight = Math.min(currentHeight, minHeight);
        currentHeight = 0;
    }
    return minHeight;
}

var minLeft = function(blockLeft, status) {
    var minLeft = Number.MAX_VALUE;
    var currentLeft = 0;
    for (var i = 0; i < blockLeft.length; ++i) {
        for (var j = blockLeft[i].x - 1; j >= 0; --j) {
            if (status[blockLeft[i].y][j] == 0) {
                ++currentLeft;
            }
            else {
                break;
            }
        }
        minLeft = Math.min(currentLeft, minLeft);
        currentLeft = 0;
    }
    return minLeft;
}

var minRight = function (blockRight, status, cols) {
    var minRight = Number.MAX_VALUE;
    var currentRight = 0;
    for (var i = 0; i < blockRight.length; ++i) {
        for (var j = blockRight[i].x + 1; j < cols; ++j) {
            if (status[blockRight[i].y][j] == 0) {
                ++currentRight;
            }
            else {
                break;
            }
        }
        minRight = Math.min(currentRight, minRight);
        currentRight = 0;
    }
    return minRight;
}

module.exports = {
    canLeft: canLeft,
    canRight: canRight,
    blockLeft: blockLeft,
    blockRight: blockRight,
    blockBottom: blockBottom,
    minHeight: minHeight,
    minLeft: minLeft,
    minRight: minRight,
}