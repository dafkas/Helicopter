/// <reference path="enemy.ts"/>
/// <reference path="player.ts"/>

class Level {
    public div: HTMLElement;
    public ground: HTMLElement;

    private player:Player;
    private enemies:Array<Enemy> = new Array<Enemy>();
    public createEnemies:number;

    private game:Game;

    constructor(game:Game)
    {
        this.div = document.createElement("level");
        document.body.appendChild(this.div);

        this.ground = document.createElement("ground");
        document.body.appendChild(this.ground);

        this.createEnemies = setInterval(() => this.createEnemy(), 400);

        this.player = new Player();

        this.game = game;
    }

    private createEnemy()
    {
        this.enemies.push(new Enemy(this.div));
        if(this.enemies.length > 20) clearInterval(this.createEnemies);
    }

    public update(): void {
        this.player.move();
        
        // var drop = new Audio("sounds/drop.mp3"); 
        // var bomb = new Audio("sounds/bomb.wav"); 


        this.enemies.forEach(enemy => enemy.move())

        // console.log(this.player.activeBullets);

        this.player.activeBullets.forEach((bullet, i) => {
            bullet.move();
            // console.log(drop.play());
            this.enemies.forEach((enemy, i) => {
                //console.log(bullet.hitsEnemy(enemy, i));
                if(bullet.hitsEnemy(enemy, i)) {
                    console.log("hit");
                    // drop.pause();
                    
                    // drop.currentTime = 0;
                    // bomb.play();

                    bullet.remove();
                    enemy.remove();
                    
                    this.player.activeBullets.splice(i, 1);
                }
            })

            if(bullet.hitsGround(this.ground.offsetTop - 50)) {
                bullet.remove();
                this.player.activeBullets.splice(i, 1);
            }
        });
    
        
    }
}