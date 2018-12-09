new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: [],
        crit_dmg: 50,
    },
    methods: {
        startGame: function() {
            /* Reset everything */
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function() {
            /* Player turn */
            var player_dmg = this.calculateDamage(3, 10);
            this.monsterHealth -= player_dmg;
            this.turns.unshift({
                class: 'player-attack',
                text: player_dmg != this.crit_dmg ? `Player hits for ${player_dmg}!` : `Player crits for ${player_dmg}! Damn!`
            });
            if (this.checkWin()) { return; };

            /* Monster turn */
            this.monsterAttacks();
        },
        specialAttack: function() {
            /* Player turn */
            var special_dmg = this.calculateDamage(10, 20);
            this.monsterHealth -= special_dmg;
            this.turns.unshift({
                class: 'player-special-attack',
                text: special_dmg != this.crit_dmg ? `Player hits hard for ${special_dmg}!` : `Player crits hard for ${special_dmg}! Damn!`
            });
            if (this.checkWin()) { return; };

            /* Monster turn */
            this.monsterAttacks();
        },
        heal: function() {
            /* Only heal 10 health */
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            this.turns.unshift({
                class: 'player-healed',
                text: `Player heals for 10!`
            });
            this.monsterAttacks();
        },
        giveUp: function() {
            /* Game could be reset here, but w/e */
            this.gameIsRunning = false;
            this.turns.unshift({
                isPlayer: true,
                text: `Player gave up.. :(`
            });
        },
        monsterAttacks: function() {
            var mons_dmg = this.calculateDamage(5, 12);
            this.playerHealth -= mons_dmg;
            this.turns.unshift({
                class: 'monster-attack',
                text: mons_dmg != this.crit_dmg ? `Montser hits for ${mons_dmg}!` : `Montser crits for ${mons_dmg}! Damn!`
            });
            this.checkWin();
        },
        calculateDamage: function(min, max) {
            var value = Math.max(Math.floor(Math.random() * max) + 1, min);
            if (((value * 2) + 4 ) / 4 == 4) {
                /* CRIT! Random function/number set :^) */
                return this.crit_dmg;
            } else return value;
        },
        checkWin: function() {
            if (this.monsterHealth <= 0) {
                if (confirm('You won! Want to start a new game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('You lost! Want to start a new game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }
});