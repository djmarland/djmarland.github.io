var TIMER = function(player) {
    this.ytplayer = player;
    this.ytplayer.setVolume(100);
    this.addListener();
}

TIMER.prototype = {
    videos : [
        {id : 'lIV71isgbLo', time: 0}, // quagmire
        {id : 'hUVwR0rw5fk', time: 0}, // simpsons
        {id : 'C8LIuNpjGMY', time: 0},  // father ted
        {id : 'K6nCa4uR-yY', time: 5}, // herbert
        {id : 'eIkxdCLysIM', time: 0}, // vince
        {id : 'mzgT-fg01vY', time: 0}, // arse bsicuits
        {id : 'weijnvNCxqY', time: 6}, // british
        {id : 'A_Dcl2aUzsc', time: 0}, // drink
        {id : 'TpjjphkLNbs', time: 0}, // family guy
        {id : 'lZmfCQh0mS4', time: 0}, // inbetweeners
    ],
    ytplayer: null,
    intervals : null,
    length : null,
    current: null,
    timer: null,
    seconds : 0,
    clock : null,
    addListener : function() {
        var self = this;
        $('#go').click(function() {
            self.setup();
        });
        this.ytplayer.addEventListener('onStateChange', 'onytplayerStateChange');
    },
    newDom : function() {
        this.clock = $('#time');
    },
    setup : function() {
        this.intervals = $('#intervals').val();
        this.length = $('#length').val();
        $('#starting').remove();
        this.newDom();
        this.updateCount();
        this.go();
    },
    update : function() {
        this.seconds++;
        this.clock.html(this.secondsToTime(this.timeTilInterval(this.seconds)));
        this.checkInterval(this.seconds);
    },
    getVideoId : function() {
        var number = this.current%10;
        return this.videos[number];
    },
    checkInterval : function(seconds) {
        if (seconds%this.length == 0) {
            this.flashAlarm(0);
            var vid = this.getVideoId();
            this.ytplayer.loadVideoById(vid.id, vid.time);
            this.updateCount();
        }
    },
    updateCount : function() {
        this.current++;
        $('#counter').html(this.current + '/' + this.intervals);
        if (this.current >= this.intervals) {
            this.finish();
        }
    },
    finish : function() {
        clearTimeout(this.timer);
        $('#time').html('Fin');
    },
    flashAlarm : function(number) {
        $('body').toggleClass('flash');
        if (number < 5) {
            number++;
            var self = this;
            setTimeout(function() {
                self.flashAlarm(number);
            }, 1000);
        }
    },
    timeTilInterval : function(seconds) {
        return this.length - (seconds%this.length);
    },
    secondsToTime : function(time) {
        var minutes = Math.floor(time/60);
        var seconds = time - (minutes*60);
        return this.padZeros(minutes) + ':' + this.padZeros(seconds);
    },
    padZeros : function(value) {
        var str = '' + value;
        while (str.length < 2) {
            str = '0' + str;
        }
        return str;
    },
    go: function() {
        this.update();
        var self = this;
        this.timer = setInterval(function() {
            self.update();
        },1000);
    }
    
}

function embedPlayer() {
    var params = { allowScriptAccess: 'always', bgcolor: '#D5DDB3' };
    var atts = { id: 'myytplayer' };
    swfobject.embedSWF('http://www.youtube.com/apiplayer?enablejsapi=1&version=3&playerapiid=ytplayer', 
            'ytapiplayer', '400', '225', '8', null, null, params, atts);
}

function onytplayerStateChange(state) {
    if (state === 1) {
        $('#alarm').animate({left: 20}, 300);
    } else if (state === 0){
        $('#alarm').animate({left: -600}, 500);
    }
}

function onYouTubePlayerReady(playerId) {
    ytplayer = document.getElementById('myytplayer');
    new TIMER(ytplayer);
}

$(document).ready(function() {
    embedPlayer();
});

