/// <reference path="GameObject.ts"/>

class Bullet extends GameObject {

    private speedX : number;
    private speedY : number = 4;

    public posx:number;

    constructor(x:number, y:number)
    {
        super(x, y, 'bullet', 18, 18);

    }

    public move(): void
    {
        this.y += this.speedY;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    }

    public hitsGround(groundTop:number): boolean {
        return this.y > groundTop;
    }

    public hitsEnemy(enemy:Enemy, i: number):boolean
    {        
        // test x position
        

        // console.log((this.y > enemy.y) && (this.y < this.height + enemy.y)) ;
        /*
        console.log("bullet");
        console.log("x " + this.x + "," + (this.x + this.width));
        console.log("enemy")
        console.log("x " + enemy.x + "," + (enemy.x + enemy.width));
        console.log("X BULLET HIT IS " + (this.x < enemy.x + enemy.width) && (this.x + this.width > enemy.x));
        console.log("_____________");

        console.log("bullet");
        console.log("y " + this.y + "," + (this.y + this.height));
        console.log("enemy")
        console.log("y " + enemy.y + "," + (enemy.y + enemy.height));
        console.log("Y BULLET HIT IS " + (this.y < enemy.y + enemy.height) && (this.y + this.height > enemy.y));
        console.log("_____________");
        console.log("_____________");
        console.log("_____________");\
        */



        return (this.x < enemy.x + enemy.width &&
                this.x + this.width > enemy.x &&
                this.y < enemy.y + enemy.height &&
                this.height + this.y > enemy.y);
    }
}