var getTwoBit = function(n) {
        return (n > 9 ? '' : '0') + n
    }
    //获取今天yy-mm-dd格式日期，或格式化日期
var getToday = function(value) {
        var split = '-';
        if (value) {
            var date = new Date(value);
        } else {
            var date = new Date();
        }
        var y = date.getFullYear();
        var m = getTwoBit(date.getMonth() + 1);
        var d = getTwoBit(date.getDate());
        var partOne = [y, m, d].join(split);
        return partOne;
    }
    //格式化日期
var formatData = function(data) {
    var sTime = new Date(data);
    var y = sTime.getFullYear();
    var m = (sTime.getMonth() + 1) < 10 ? "0" + (sTime.getMonth() + 1) : (sTime.getMonth() + 1);
    var d = sTime.getDate() < 10 ? "0" + sTime.getDate() : sTime.getDate();
    var time = y + '-' + m + '-' + d;
    return time;
};
//格式化日期或获取今天完整日期
var getFullTime = function(value) {
        if (value) {
            var date = new Date(value);
        } else {
            var date = new Date();
        }
        var split = '-';
        var y = date.getFullYear();
        var m = getTwoBit(date.getMonth() + 1);
        var d = getTwoBit(date.getDate());
        var h = getTwoBit(date.getHours());
        var min = getTwoBit(date.getMinutes());
        var s = getTwoBit(date.getSeconds());
        var partOne = [y, m, d].join(split);
        var partTwo = [h, min, s].join(':');
        return partOne + " " + partTwo;
    }
    //获取今天时间
var getNowHour = function(value) {
        var date = new Date();
        var h = date.getHours();
        return h;
    }
    //获取前N天日期
var getBeforeDay = function(val) {
        var date = new Date();
        date.setTime(date.getTime() + 3600 * 1000 * 24 * parseInt(val));
        var beforeDay = getToday(date);
        return beforeDay;
    }
    //获取 HH:MM:SS格式时间
var getEndPartTime = function(value) {
    if (value) {
        var date = new Date(value);
    } else {
        var date = new Date();
    }
    var h = getTwoBit(date.getHours());
    var min = getTwoBit(date.getMinutes());
    var s = getTwoBit(date.getSeconds());
    var partTwo = [h, min, s].join(':');
    return partTwo;
}

export {
    getEndPartTime,
    getToday,
    formatData,
    getFullTime,
    getNowHour,
    getBeforeDay
}