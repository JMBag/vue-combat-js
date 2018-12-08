new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function() {
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
                isPlayer: true,
                text: `Player hits Monster for ${player_dmg}!`
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
                isPlayer: true,
                text: `Player hits Monster hard for ${special_dmg}!`
            });
            if (this.checkWin()) { return; };

            /* Monster turn */
            this.monsterAttacks();
        },
        heal: function() {
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer: true,
                text: `Player heals for 10!`
            });
            this.monsterAttacks();
        },
        giveUp: function() {
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
                isPlayer: false,
                text: `Montser hits Player for ${mons_dmg}!`
            });
            this.checkWin();
        },
        calculateDamage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
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