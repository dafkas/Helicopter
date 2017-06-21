/// <reference path="enemy.ts"/>
/// <reference path="player.ts"/>

class Level {
    public div: HTMLElement;
    public ground: HTMLElement;

    private player:Player;
    private enemies:Array<Enemy> = new Array<Enemy>();
    private bullets:Array<Bullet> = new Array<Bullet>();
    public createEnemies:number;

    public score:Number;

    private game:Game;

    constructor(game:Game)
    {
        this.div = document.createElement("level");
        document.body.appendChild(this.div);

        this.ground = document.createElement("ground");
        document.body.appendChild(this.ground);

        this.createEnemies = setInterval(() => this.createEnemy(), 1000);

        this.player = new Player();
        this.game = game;
    }

    private createEnemy()
    {
        this.enemies.push(new Enemy(this.div));
        if(this.enemies.length > 3) clearInterval(this.createEnemies);
    }

    public update(): void {
        this.player.move();
        this.enemies.forEach(enemy => enemy.move())
        this.player.activeBullets.forEach((bullet, j) => {
            bullet.move();
            this.enemies.forEach((enemy, i) => {
                if(bullet.hitsEnemy(enemy, i)) {
                    this.player.activeBullets.splice(j, 1);
                    this.enemies.splice(i, 1);
                    this.score = 100;
                    bullet.remove();
                    console.log(this.enemies.length);
                    enemy.remove();
                    if(this.enemies.length == 0)
                    {
                        console.log("no more enemies");
                        this.game.endGame();
                    }
                }
            });  

            if(bullet.hitsGround(this.ground.offsetTop - 20)) {
               this.player.activeBullets.splice(j, 1);
                bullet.remove(); 
            }
        });
    }

    public remove(){
        this.ground.remove();
        this.div.remove();
        this.div = document.createElement("endscreen");
        document.body.appendChild(this.div);

        document.getElementsByTagName("endscreen")[0].innerHTML = "You won!";
        document.getElementsByName("endscreen")[0].innerHTML = this.startGame();
        this.player.removePlayer();
    }
}