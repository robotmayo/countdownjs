var countdown = function (date,format) {
    // First things first, check for momentjs
    var _undefined;
    if(window.moment == _undefined){
        throw new Error("countdownjs requires momentjs to function!");
        return null;
    }
    var _countdown = {};
    var defaultConfig = {
        pad : true,
        daysDisplay = "cd-days",
        hoursDisplay = "cd-hours",
        minutesDisplay = "cd-minutes",
        secondsDisplay = "cd-seconds"
    }
    _countdown.config = defaultConfig;
    _countdown.now = moment();
    _countdown.targetDate = moment(date,format);

    (function(){
        _countdown.daysDisplay = document.getElementById(_countdown.config.daysDisplay);
        _countdown.hoursDisplay = document.getElementById(_countdown.config.hoursDisplay);
        _countdown.minutesDisplay = document.getElementById(_countdown.config.minutesDisplay);
        _countdown.secondsDisplay = document.getElementById(_countdown.config.secondsDisplay);
    }())

    function hoursToMidnight(){
        var midnight = new Date();
        midnight.setHours( 24 );
        midnight.setMinutes( 0 );
        midnight.setSeconds( 0 );
        midnight.setMilliseconds( 0 );
        return Math.floor(( midnight.getTime() - new Date().getTime() ) / 1000 / 60 / 60);
    }

    
    _countdown.calculate = function(unit){
        if(unit == _undefined) throw new Error("No unit specified");
        var diff = targetDate.diff(_countdown.now,unit);
        return diff;
    }

    _countdown.seconds = function(){ return 60 - _countdown.now.seconds()};
    _countdown.minutes = function(){ return 60 - _countdown.now.minutes()};
    _countdown.hours = function(){
        if(_countdown.isToday()){
            return _countdown.hoursUntil();
        }else{
            return 60 - hoursToMidnight();
        }
    };
    _countdown.days = function(){return _countdown.calculate('days')};
    _countdown.milliseconds = function(){return _countdown.calculate('milliseconds')};
    _countdown.isToday = function(){return _countdown.days() == 0};
    _countdown.hasPast = function(){return _countdown.days() < 0;}
    

    _countdown.updateDisplay = function(){
        
    };

    _countdown.daysUntil = function(){return _countdown.calculate('days')}
    _countdown.hoursUntil = function(){return _countdown.calculate('hours')}
    _countdown.secondsUntil = function(){return _countdown.calculate('seconds')}
    _countdown.minutesUntil = function(){return _countdown.calculate('minutes')}

    return _countdown;
}
d = countdown("10-2-2013","MM-DD-YYYY");
//d.calculate('milliseconds');