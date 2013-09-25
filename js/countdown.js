var countdown = function (date) {
    // First things first, check for momentjs
    var _undefined;
    if(window.moment == _undefined){
        throw new Error("countdownjs requires momentjs to function!");
        return null;
    }
    var _countdown = {};
    var now = moment();
    var targetDate = moment(date,"MM-DD-YYYY");

    _countdown.calculate = function(unit){
        if(unit == _undefined) throw new Error("No unit specified");
        var diff = targetDate.diff(now,unit);
        console.log(diff);
    }
    _countdown.updateDisplay = function(){

    }

    return _countdown;
}
d = countdown("10-2-2013");
d.calculate('milliseconds');