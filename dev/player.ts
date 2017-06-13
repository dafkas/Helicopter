/// <reference path="bullet.ts"/>
class Player {

    public div: HTMLElement;

    public x:number;
    public y:number;

    public bulletY:number;
    private speedX : number;
    private speedY : number;

    public width:number;
    public height:number;

    public activeBullets:Array<Bullet>;

    constructor()
    {
        this.x = 400;
        this.y = 200;
        this.width = 61;
        this.height = 102;
        this.activeBullets = [];

        this.div = document.createElement("player");
        document.body.appendChild(this.div);

        window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyDown(e));
    }

    public move() : void 
    {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    }

    private onKeyDown(event:KeyboardEvent):void 
    {
        switch(event.keyCode){
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
    }

    public shoot() :void
    {
        if(this.activeBullets.length > 0)
        {
            console.log("can't fire");
        } else {
            this.activeBullets.push(new Bullet(this.x, this.y));
        }
    }

}