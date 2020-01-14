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
        attack: function () {
            this.monsterHealth -= this.calculateDamage(3, 10);
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monter for ' + this.calculateDamage(3, 10)
            });
            if (this.checkWin()) {
                return;
            }

            this.monsterAttacks();
        },
        specialAttack: function () {
            this.monsterHealth -= this.calculateDamage(10, 20);;

            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monter hard for ' + this.calculateDamage(10, 20)
            });

            if (this.checkWin()) {
                return;
            }

            this.monsterAttacks();
        },
        heal: function () {
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }

            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals for 10'
            });

            this.monsterAttacks();
        },
        giveUp: function () {
            if (confirm('Game ended! New Game?')) {
                this.startGame();
            } else {
                this.gameIsRunning = false;
            }
        },
        calculateDamage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function() {
            if (this.monsterHealth <= 0) {
                if (confirm('You won! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('You lost! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        },
        monsterAttacks: function () {
            this.playerHealth -= this.calculateDamage(5, 12);
            this.checkWin();
            this.turns.unshift({
                isPlayer: false,
                text: 'Monter hits Player for ' + this.calculateDamage(5, 12)
            });
        }
    }
});
