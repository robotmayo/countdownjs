var countdown = function (date,format) {
    // First things first, check for momentjs
    var _undefined;
    if(window.moment == _undefined){
        throw new Error("countdownjs requires momentjs to function!");
        return null;
    }
    var _countdown = {};
    var defaultConfig = {
        pad : false,
        daysDisplay : "cd-days",
        hoursDisplay : "cd-hours",
        minutesDisplay : "cd-minutes",
        secondsDisplay : "cd-seconds",
        millisecondsDisplay : "cd-milliseconds",
        exclude : "mm:d"
    }
    _countdown.config = defaultConfig;
    _countdown.now = moment();
    _countdown.targetDate = moment(date,format);

    function setUpConfig(){
        var e = _countdown.config.exclude.split(":");
        _countdown.exclude = {hours: false,minutes:false,seconds:false,days:false,milliseconds:true}
        for(var i = 0; i < e.length; i++){
            e[i].toLowerCase();
            switch(e[i]){
                case "m":
                    _countdown.exclude.minutes = true;
                    break;
                case "s":
                    _countdown.exclude.seconds = true;
                    break;
                case "ml":
                    _countdown.exclude.milliseconds = true;
                    break;
                case "h":
                    _countdown.exclude.hours = true;
                    break;
                case "d":
                    _countdown.exclude.days = true;
                    break;
            }
        }
        if(!_countdown.exclude.days) _countdown.daysDisplay = document.getElementById(_countdown.config.daysDisplay);
        if(!_countdown.exclude.hours) _countdown.hoursDisplay = document.getElementById(_countdown.config.hoursDisplay);
        if(!_countdown.exclude.minutes) _countdown.minutesDisplay = document.getElementById(_countdown.config.minutesDisplay);
        if(!_countdown.exclude.seconds) _countdown.secondsDisplay = document.getElementById(_countdown.config.secondsDisplay);
        if(!_countdown.exclude.milliseconds) _countdown.millisecondsDisplay = document.getElementById(_countdown.config.millisecondsDisplay);
        
    }
    setUpConfig();

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
        var diff = _countdown.targetDate.diff(_countdown.now,unit);
        return diff;
    }

    _countdown.seconds = function(){ return 59 - _countdown.now.seconds()};
    _countdown.minutes = function(){ return 59 - _countdown.now.minutes()};
    _countdown.hours = function(){
        if(_countdown.isToday()){
            return _countdown.hoursUntil();
        }else{
            return hoursToMidnight();
        }
    };
    _countdown.days = function(){return _countdown.calculate('days')};
    _countdown.milliseconds = function(){return _countdown.calculate('milliseconds')};
    _countdown.isToday = function(){return _countdown.days() == 0};
    _countdown.hasPast = function(){return _countdown.days() <= 0 && _countdown.hours() <= 0 && _countdown.minutes() <= 0 && _countdown.seconds() <= 0;}
    

    _countdown.updateDisplay = function(){
        var data = 0;
        if(!_countdown.exclude.seconds){
            data = _countdown.seconds();
            _countdown.secondsDisplay.innerHTML = data < 10 && _countdown.config.pad ? "0"+data : data;
            if(_countdown.onDisplayUpdate) _countdown.onDisplayUpdate();
        }

        if(!_countdown.exclude.minutes){
            data = _countdown.minutes();
            _countdown.minutesDisplay.innerHTML = data < 10 && _countdown.config.pad ? "0"+data : data;
            if(_countdown.onDisplayUpdate) _countdown.onDisplayUpdate();
        }

        if(!_countdown.exclude.hours){
            _countdown.hoursDisplay.innerHTML = data < 10 && _countdown.config.pad ? "0"+data : data;
            if(_countdown.onDisplayUpdate) _countdown.onDisplayUpdate();
        }

        if(!_countdown.exclude.days){
            data = _countdown.days();
            _countdown.daysDisplay.innerHTML = data < 10 && _countdown.config.pad ? "0"+data : data;
            if(_countdown.onDisplayUpdate) _countdown.onDisplayUpdate();
        }
        if(_countdown.onDisplayUpdate) _countdown.onDisplayUpdate();
    };

    _countdown.daysUntil = function(){return _countdown.calculate('days')}
    _countdown.hoursUntil = function(){return _countdown.calculate('hours')}
    _countdown.secondsUntil = function(){return _countdown.calculate('seconds')}
    _countdown.minutesUntil = function(){return _countdown.calculate('minutes')}

    return _countdown;
}
d = countdown("10-2-2013","MM-DD-YYYY");
//d.calculate('milliseconds');
d.updateDisplay()