var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameObject = (function () {
    function GameObject(x, y, divName, width, height) {
        this.div = document.createElement(divName);
        document.body.appendChild(this.div);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    }
    GameObject.prototype.remove = function () {
        this.div.remove();
    };
    return GameObject;
}());
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet(x, y) {
        var _this = _super.call(this, x, y, 'bullet', 5, 5) || this;
        _this.speedY = 4;
        return _this;
    }
    Bullet.prototype.move = function () {
        this.y += this.speedY;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    Bullet.prototype.hitsGround = function (groundTop) {
        return this.y > groundTop;
    };
    Bullet.prototype.hitsEnemy = function (enemy, i) {
        return (this.x < enemy.x + enemy.width &&
            this.x + this.width > enemy.x &&
            this.y < enemy.y + enemy.height &&
            this.height + this.y > enemy.y);
    };
    return Bullet;
}(GameObject));
var Enemy = (function () {
    function Enemy(parent) {
        this.speed = 0;
        this.div = document.createElement("enemy");
        document.body.appendChild(this.div);
        this.width = 168;
        this.height = 108;
        this.x = Math.ceil(Math.random() * 5) * 110;
        this.y = 660;
        this.speed = Math.random() * 2 + 2;
        this.startPosition();
    }
    Enemy.prototype.startPosition = function () {
        this.x = (Math.random() * (window.innerWidth / 2)) + (window.innerWidth / 4);
        this.y = 620;
        this.speedX = Math.round(Math.random() * 3) + 1;
        this.speedY = 0;
        if (Math.random() > 0.5)
            this.speedX *= -1;
    };
    Enemy.prototype.move = function () {
        this.x += this.speedX;
        if (this.x > window.innerWidth || this.x < -10) {
            this.speedX *= -1;
        }
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    Enemy.prototype.remove = function () {
        this.div.remove();
    };
    return Enemy;
}());
var Player = (function () {
    function Player() {
        var _this = this;
        this.x = 400;
        this.y = 200;
        this.width = 61;
        this.height = 102;
        this.activeBullets = [];
        this.div = document.createElement("player");
        document.body.appendChild(this.div);
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
    }
    Player.prototype.move = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    Player.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case 65:
                this.x -= this.width;
                break;
            case 68:
                this.x += this.width;
                break;
            case 87:
                this.y -= 30;
                break;
            case 83:
                this.y += 30;
                break;
            case 32:
                this.shoot();
        }
    };
    Player.prototype.shoot = function () {
        if (this.activeBullets.length > 0) {
            console.log("can't fire");
        }
        else {
            this.activeBullets.push(new Bullet(this.x, this.y));
        }
    };
    return Player;
}());
var Level = (function () {
    function Level(game) {
        var _this = this;
        this.enemies = new Array();
        this.bullets = new Array();
        this.div = document.createElement("level");
        document.body.appendChild(this.div);
        this.ground = document.createElement("ground");
        document.body.appendChild(this.ground);
        this.createEnemies = setInterval(function () { return _this.createEnemy(); }, 400);
        this.player = new Player();
        this.game = game;
    }
    Level.prototype.addBulletToLevel = function () {
    };
    Level.prototype.removeBullet = function (b) {
    };
    Level.prototype.createEnemy = function () {
        this.enemies.push(new Enemy(this.div));
        if (this.enemies.length > 10)
            clearInterval(this.createEnemies);
    };
    Level.prototype.update = function () {
        var _this = this;
        this.player.move();
        var drop = new Audio("sounds/drop.mp3");
        var bomb = new Audio("sounds/bomb.wav");
        this.enemies.forEach(function (enemy) { return enemy.move(); });
        this.player.activeBullets.forEach(function (bullet, j) {
            bullet.move();
            _this.enemies.forEach(function (enemy, i) {
                if (bullet.hitsEnemy(enemy, i)) {
                    bullet.remove();
                    enemy.remove();
                    console.log("hit");
                }
            });
            if (bullet.hitsGround(_this.ground.offsetTop - 50)) {
                bullet.remove();
            }
        });
    };
    return Level;
}());
var Game = (function () {
    function Game() {
        var _this = this;
        this.enemies = new Array();
        this.level = new Level(this);
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.level.update();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    return Game;
}());
window.addEventListener('load', function () {
    new Game();
});
var Utils = (function () {
    function Utils() {
    }
    Utils.checkCollision = function (bullet, enemy) {
        return (bullet.x < enemy.x + enemy.width &&
            bullet.x + bullet.width > enemy.x &&
            bullet.y < enemy.y + enemy.height &&
            bullet.height + bullet.y > enemy.y);
    };
    return Utils;
}());
//# sourceMappingURL=main.js.map