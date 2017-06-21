/// <reference path="level.ts"/>
/// <reference path="enemy.ts"/>
/// <reference path="player.ts"/>

class Game {

    private level:Level;
    public player:Player;
    private enemies:Array<Enemy>;   

    public btn:HTMLElement;
    public score:number = 0;

    constructor()
    {
        this.enemies = new Array<Enemy>();

        this.btn = document.createElement("startbutton");
        document.body.appendChild(this.btn);

        let ui = document.createElement("ui");
        document.body.appendChild(ui);

        this.updateScore();
    
        this.btn.addEventListener("click", function(){
            this.btn.remove();
            this.startGame();
        }.bind(this));

    }

    public startGame() 
    {
        this.level = new Level(this);
        requestAnimationFrame(() => this.gameLoop());
    }

    public endGame()
    {
       this.level.remove();
    }

    public updateScore()
    {
        document.getElementsByTagName("ui")[0].innerHTML = "SCORE " + this.score;
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