/// <reference path="level.ts"/>
/// <reference path="enemy.ts"/>
/// <reference path="player.ts"/>

class Game {

    private level:Level;
    private player:Player;
    private enemies:Array<Enemy>;

    constructor()
    {
        this.enemies = new Array<Enemy>();
        this.level = new Level(this);
        requestAnimationFrame(() => this.gameLoop());
    }

    private gameLoop()
    {
        this.level.update();
        requestAnimationFrame(() => this.gameLoop());
    }  
}


window.addEventListener('load', function(){
    new Game();
});