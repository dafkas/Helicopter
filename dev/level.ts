/// <reference path="enemy.ts"/>
/// <reference path="player.ts"/>

class Level {
    public div: HTMLElement;
    public ground: HTMLElement;

    private player:Player;
    private enemies:Array<Enemy> = new Array<Enemy>();
    private bullets:Array<Bullet> = new Array<Bullet>();
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

    public addBulletToLevel(){

    }

    public removeBullet(b:Bullet){

    }

    private createEnemy()
    {
        this.enemies.push(new Enemy(this.div));
        if(this.enemies.length > 10) clearInterval(this.createEnemies);
    }

    public update(): void {
        this.player.move();
        
        var drop = new Audio("sounds/drop.mp3"); 
        var bomb = new Audio("sounds/bomb.wav"); 


       this.enemies.forEach(enemy => enemy.move())

        //console.log(this.player.activeBullets);

        this.player.activeBullets.forEach((bullet, j) => {
            bullet.move();
//            drop.play();
            //console.log(drop.play());
            this.enemies.forEach((enemy, i) => {
                //console.log(bullet.hitsEnemy(enemy, i));
                if(bullet.hitsEnemy(enemy, i)) {

                    bomb.play();

                 //   this.player.activeBullets.splice(j, 1);
                    bullet.remove();
                    enemy.remove();
                    console.log("hit");  
                }
            })

            if(bullet.hitsGround(this.ground.offsetTop - 50)) {
               // this.player.activeBullets.splice(j, 1);
                bullet.remove();
                bomb.play();
            }
        });
    
        
    }
}