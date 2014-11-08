(function() {

    var Card = function(number, colour) {
        this.number = number;
        this.colour = colour;
    }
    Card.prototype = {
        start_x : null,
        start_y : null,
        end_x : null,
        end_y : null,
        number : null,
        colour : '#EEE',
        back_colour : '#222',
        height : 150,
        width : 100,
        faceUp : true,
        frozen : false,
        xy : function() {
            // if x/y not set, calculate them
            if (this.start_x === null) {
                var y_o = 0,
                    x_o = 0;
                if (this.number > 6) {
                    y_o = this.height + Game.options.grid_gap;
                    x_o = -((this.width + Game.options.grid_gap) * 7);
                }
                this.start_x = x_o + (Game.options.grid_start_x + 
                        ((this.width + Game.options.grid_gap) * this.number)) + 0.5;
                this.start_y = Game.options.grid_start_y +  y_o + 0.5;
                this.end_x = this.start_x + this.width;
                this.end_y = this.start_y + this.height;
            }
        },
        draw : function() {
            this.xy();
    
            this.remove();
            Game.ctx.beginPath();
            Game.ctx.rect(this.start_x, this.start_y, this.width, this.height);
            
            // the unique bit
            Game.ctx.fillStyle = (this.faceUp) ? this.colour : this.back_colour;
            Game.ctx.fill();
        },
        turnOver : function() {
            if (this.frozen) return false;
            this.faceUp = !this.faceUp;
            this.draw();
        },
        reveal : function() {
            this.faceUp = true;
            this.draw();
        },
        remove : function() {
            this.xy();
            Game.ctx.clearRect(this.start_x, this.start_y,  this.width ,this.height);
        },
        freeze : function() {
            this.frozen = true;
        }
    }


    var Board = function(container) {
        this.options.container = container;
        this.ctx = this.options.container.getContext('2d');
    }

    Board.prototype = {
        ctx : null,
        options : {
            container : null,
            context : null,
            height : 500,
            width : 900,
            grid_start_x : 20,
            grid_start_y : 20,
            grid_gap     : 20,
        },
        levels : [
            { time : 10,    number : 1,     cards : 2   },
            { time : 5,     number : 2,     cards : 3   },
            { time : 5,     number : 3,     cards : 4   },
            { time : 7,     number : 4,     cards : 5   },
            { time : 10,    number : 5,     cards : 6   },
            { time : 12,    number : 6,     cards : 7   },
            { time : 15,    number : 7,     cards : 8   },
            { time : 17,    number : 8,     cards : 9   },
            { time : 20,    number : 9,     cards : 10  },
            { time : 25,    number : 10,    cards : 11  },
            { time : 30,    number : 11,    cards : 12  },
            { time : 20,    number : 12,    cards : 12  },
            { time : 10,    number : 13,    cards : 12  },
            { time : 5,     number : 14,    cards : 12  },
            { time : 3,     number : 15,    cards : 12  }
        ],
        current_score : 0,
        game_active : false,
        current_cards : null,
        current_choice : null,
        turn_started : false,
        cards_left : null,
        current_level: 0,
        clear : function() {
            this.ctx.clearRect(0,0,this.options.width,this.options.height);
        },
        shuffleArray : function(d) {
            var len = d.length;
            for (var c=len-1; c>0;c--) {
                var b = Math.floor(Math.random() * (c+1));
                var a = d[c];
                d[c] = d[b];
                d[b] = a;
            }
            return d;
        },
        generateCards : function(level_data) {
            var _this = this,
                cards = [],
                colours = ['#F00','#0F0','#FF0','#00F','#F90','#F0F','#CCC','#666','#0FF','#9E6923','#7B1A8F','#F3CBF5'];
            // randomise
            colours = this.shuffleArray(colours);
            colours = colours.slice(0,level_data.cards);
            for (var i=0;i<level_data.cards;i++) {
                cards[i] = new Card(i, colours[i]);
                cards[i].draw();
                var click_name = 'card-' + i;
                this.clickHandler.add(click_name, 
                                        cards[i].start_x,
                                        cards[i].start_y,
                                        cards[i].end_x,
                                        cards[i].end_y, 
                                        (function(x) {
                                            return function() {
                                                _this.clickCard(x);
                                            };
                                        })(i),
                                        ['card']);
                this.clickHandler.disable(click_name);
            }
            return cards;
        },
        clickCard : function(i) {
            this.current_cards[i].turnOver();
            this.clickHandler.remove('card-' + i);
            this.current_cards[i].freeze();
            if (this.current_cards[i].number == this.current_choice) {
                this.current_score++;
                this.cards_left--;
                if (this.cards_left > 0) {
                    this.writeStatus('Correct. Find the next one. Your Score: ' + this.current_score);
                    this.startTurn();
                } else {
                    this.completeLevel();
                }
            } else {
                this.endGame();
            }
        },
        completeLevel : function() {
            var bh = 50,
                bw = 150,
                x = (this.options.width/2) - (bw/2),
                y = (this.options.height/2) - (bh/2),
                next = this.current_level + 1,
                _this = this;

                this.ctx.beginPath();
                this.ctx.rect(0,0,this.options.width,this.options.height);

                // the unique bit
                this.ctx.fillStyle = 'rgba(0,0,0,0.6)';
                this.ctx.fill();

            if (this.levels[next]) {
                // draw next level button and enable it

                this.writeStatus('Level Complete. Your Score: ' + this.current_score);

                this.ctx.beginPath();

                this.ctx.rect(x, y,bw,bh);

                this.ctx.fillStyle = '#FFF';
                this.ctx.fill();

                this.ctx.font = '24pt Arial';
                this.ctx.fillStyle = '#222';
                this.ctx.fillText('Next level',x, (this.options.height/2) + (bh/4));

                this.clickHandler.add('next_level', 
                                            x,
                                            y,
                                            x + bw,
                                            x + bh, 
                                            (function() {
                                                return function() {
                                                    _this.nextLevel();
                                                };
                                            })(),
                                            ['card']);
            } else {
                this.writeStatus('Sorry. No more levels. Your score: ' + this.current_score);
            }


        },
        createLevel : function(level) {
            this.clear();
            this.clickHandler.clearAll();
            this.current_level = level;
            var level_data = this.levels[level];
            this.cards_left = level_data.cards;
            this.current_cards = this.generateCards(level_data);

/*
            this.ctx.font = '24pt Arial';
            this.ctx.fillStyle = '#c22';
            this.ctx.fillText('Start now', (this.options.width - 150), (this.options.height-this.options.grid_gap));

            this.clickHandler.add('next_level', 
                                        (this.options.width - 150),
                                        (this.options.height-this.options.grid_gap),
                                        150,
                                        50, 
                                        (function() {
                                            return function() {
                                            console.log('skipped countdown');
                                               
                                            };
                                        })(),
                                        ['skip']);
*/

            this.startLevel(level_data.time);
        },
        startLevel : function(countdown) {
            var _this = this;
            this.writeStatus(countdown);
            if (countdown > 0) {
                setTimeout(function() {
                    _this.startLevel(countdown-1);
                }, 1000);
            } else {
                this.writeStatus('Your score: ' + this.current_score);
                _this.hideCards();
                _this.clickHandler.enableTags('card');
                _this.startTurn();
            }
        },
        nextLevel : function() {
            this.createLevel(this.current_level + 1);
        },
        revealCards : function(i) {
            var cards_len = this.current_cards.length;
            for (var i=0; i<cards_len; i++) {
                this.current_cards[i].reveal();
            }
        },
        hideCards : function() {
            var cards_len = this.current_cards.length;
            for (var i=0; i<cards_len; i++) {
                this.current_cards[i].turnOver();
            }
        },
        selectRandomUnfrozenCard : function() {
            var num = Math.floor(Math.random() * this.current_cards.length);
            if (this.current_cards[num].frozen) {
                return this.selectRandomUnfrozenCard();
            }
            return this.current_cards[num];
        },
        startTurn : function() {
            this.game_active = true;
            this.turn_started = true;

            // choose a card at random
            var card = this.selectRandomUnfrozenCard();
            this.current_choice = card.number;

            this.ctx.beginPath();
            this.ctx.rect(this.options.width - this.options.grid_gap - card.width,
                          this.options.height - this.options.grid_gap - card.height,
                          card.width,
                          card.height
                          );

            // the unique bit
            this.ctx.fillStyle = card.colour;
            this.ctx.fill();
        },
        getCursorPosition : function(e) {
            var x;
            var y;
            if (e.pageX != undefined && e.pageY != undefined) {
                x = e.pageX;
                y = e.pageY;
            } else {
                x = e.clientX + document.body.scrollLeft +
                        document.documentElement.scrollLeft;
                y = e.clientY + document.body.scrollTop +
                        document.documentElement.scrollTop;
            }
            x -= this.options.container.offsetLeft;
            y -= this.options.container.offsetTop;
            return [x,y];
        },
        writeStatus : function(status) {
            var x = this.options.grid_gap + 0.5,
                y = (this.options.height - this.options.grid_gap - 50) + 0.5;
            this.ctx.clearRect(x, y, 700, 60);
            if (status != null) {       
                this.ctx.font = '24pt Arial';
                this.ctx.fillStyle = '#222';
                this.ctx.fillText(status, x, y + 50);
            }
        },
        endGame : function() {
            this.game_active = false;
            this.revealCards();
            this.ctx.beginPath();
            this.ctx.rect(0,0,this.options.width,this.options.height);

            // the unique bit
            this.ctx.fillStyle = 'rgba(0,0,0,0.6)';
            this.ctx.fill();
            this.writeStatus('Wrong. Game Over. Your score: ' + this.current_score);
        },
        handleCanvasClicks : function() {
            var _this = this;
            this.options.container.addEventListener("click", function (e) {
                e.preventDefault();
                var coords = _this.getCursorPosition(e);
                _this.clickHandler.handleClick(coords[0],coords[1]);
            }, false);
            /*
            this.options.container.addEventListener('mousemove', function (e) {
                e.preventDefault();
                var coords = _this.getCursorPosition(e);
                _this.clickHandler.handleHover(coords[0],coords[1]);
            }, false);
            */ 
            this.options.container.addEventListener('mousedown', function (e) {
                event.preventDefault();
            }, false);
        },
        setup : function() {
            this.handleCanvasClicks();
            this.createLevel(this.current_level);
        },
        clickHandler : {
            regions : [],
            add : function(name, x_s, y_s, x_e, y_e, callback, tags) {
                tags = tags || [];
                this.regions.push({
                    name: name,
                    x_s : x_s,
                    y_s : y_s,
                    x_e : x_e,
                    y_e : y_e,
                    callback : callback,
                    tags : tags,
                    is_enabled : true
                });
            },
            hasTag : function(needle, haystack) {
                var length = haystack.length;
                for(var i = 0; i < length; i++) {
                    if(haystack[i] == needle) return true;
                }
                return false;
            },
            clearAll : function() {
                this.regions = [];
            },
            exists : function(name) {
                var length = this.regions.length;
                for(var i = 0; i < length; i++) {
                    if(this.regions[i].name == name) return true;
                }
                return false;
            },
            enable : function(name) {
                var length = this.regions.length;
                for(var i = 0; i < length; i++) {
                    if(this.regions[i].name == name) {
                        this.regions[i].is_enabled = true;
                    }
                }
            },
            disable : function(name) {
                var length = this.regions.length;
                for(var i = 0; i < length; i++) {
                    if(this.regions[i].name == name) {
                        this.regions[i].is_enabled = false;
                    }
                }
            },
            disableTags : function(tag) {
                var len = this.regions.length;
                for (var i=0;i<len;i++) {
                    if (this.hasTag(tag, this.regions[i].tags)) {
                        this.regions[i].is_enabled = false;
                    }
                }
            },
            enableTags : function(tag) {
                var len = this.regions.length;
                for (var i=0;i<len;i++) {
                    if (this.hasTag(tag, this.regions[i].tags)) {
                        this.regions[i].is_enabled = true;
                    }
                }
            },
            remove : function(name) {
                var length = this.regions.length;
                for(var i = 0; i < length; i++) {
                    if(this.regions[i] && this.regions[i].name == name) {
                        this.regions[i] = undefined;
                    }
                }
            },
            handleClick : function(x, y) {
                var len = this.regions.length;
                for (var i=0;i<len;i++) {
                    if (
                        this.regions[i] &&
                        this.regions[i].is_enabled &&
                        x >= this.regions[i].x_s &&
                        x <= this.regions[i].x_e &&
                        y >= this.regions[i].y_s &&
                        y <= this.regions[i].y_e
                    ) {
                        this.regions[i].callback();
                        return;
                    }
                }
            },
            handleHover : function(x, y) {
                var len = this.regions.length;
                for (var i=0;i<len;i++) {
                    if (
                        this.regions[i].is_enabled &&
                        x >= this.regions[i].x_s &&
                        x <= this.regions[i].x_e &&
                        y >= this.regions[i].y_s &&
                        y <= this.regions[i].y_e
                    ) {
                        document.body.style.cursor = 'pointer';
                    } else {
                        document.body.style.cursor = 'default';
                    }
                }
            }
        }
    }

    var element = document.getElementById('game');
    var Game = new Board(element);
    Game.setup();

})();