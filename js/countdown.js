var countdown = function (date,format,config) {
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
        exclude : "mm",
        onFinish : _undefined,
        onDisplayUpdate : _undefined,
        onMillisecondsDisplayUpdate : _undefined,
        onSecondsDisplayUpdate : _undefined,
        onHoursDisplayUpdate : _undefined,
        onDaysDisplayUpdate : _undefined,
    }
    
    _countdown.now = moment();
    _countdown.targetDate = moment(date,format);

    if(config){
        var holderObj = {};
        for(var name in defaultConfig) {holderObj[name] = defaultConfig[name];}
        for(var name in _countdown.config){holderObj[name] = _countdown.config[name];}
        return holderObj;
    }else{
        _countdown.config = defaultConfig;
    }

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

        if(!_countdown.exclude.milliseconds){
            data = _countdown.milliseconds();
            _countdown.millisecondsDisplay.innerHTML = data < 10 && _countdown.config.pad ? "0"+data : data;
            if(_countdown.onMillisecondsDisplayUpdate) _countdown.onMillisecondsDisplayUpdate();
        }

        if(!_countdown.exclude.seconds){
            data = _countdown.seconds();
            _countdown.secondsDisplay.innerHTML = data < 10 && _countdown.config.pad ? "0"+data : data;
            if(_countdown.onSecondsDisplayUpdate) _countdown.onSecondsDisplayUpdate();
        }

        if(!_countdown.exclude.minutes){
            data = _countdown.minutes();
            _countdown.minutesDisplay.innerHTML = data < 10 && _countdown.config.pad ? "0"+data : data;
            if(_countdown.onMinutesDisplayUpdate) _countdown.onMinutesDisplayUpdate();
        }

        if(!_countdown.exclude.hours){
            data = _countdown.hours();
            _countdown.hoursDisplay.innerHTML = data < 10 && _countdown.config.pad ? "0"+data : data;
            if(_countdown.onHoursDisplayUpdate) _countdown.onHoursDisplayUpdate();
        }

        if(!_countdown.exclude.days){
            data = _countdown.days();
            _countdown.daysDisplay.innerHTML = data < 10 && _countdown.config.pad ? "0"+data : data;
            if(_countdown.onDaysDisplayUpdate) _countdown.onDaysDisplayUpdate();
        }
        if(_countdown.onDisplayUpdate) _countdown.onDisplayUpdate();
    };

    _countdown.begin = function(){
        _countdown.update();
        _countdown.intervalID = setInterval(_countdown.update,1000);
    }
    _countdown.update = function(){
        if(_countdown.hasPast()){
            if(_countdown.onFinish) _countdown.onFinish();
            clearInterval(_countdown.intervalID);
        }
        _countdown.now = moment();
        _countdown.updateDisplay();
    }

    _countdown.daysUntil = function(){return _countdown.calculate('days')}
    _countdown.hoursUntil = function(){return _countdown.calculate('hours')}
    _countdown.secondsUntil = function(){return _countdown.calculate('seconds')}
    _countdown.minutesUntil = function(){return _countdown.calculate('minutes')}


    return _countdown;
}
d = countdown("10-2-2013","MM-DD-YYYY");
//d.calculate('milliseconds');
d.begin();