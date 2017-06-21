class Enemy 
{
    private speed:number = 0;

    public div: HTMLElement;
    public x: number;
    public y: number;

    private speedX : number;
    private speedY : number;

    public width: number;
    public height: number;

    constructor(parent: HTMLElement)
    {
        this.div = document.createElement("enemy");
        document.body.appendChild(this.div);
        this.width = 168;
        this.height = 108;
        this.x = Math.round(Math.random() * 5) * 120;
        
        this.y = 660;
        this.speed = Math.random() * 2 + 2;
        this.startPosition();
    }

    public startPosition()
    {
        this.x = (Math.random() * (window.innerWidth/2)) + (window.innerWidth/4);
        this.y = 620;
        
        this.speedX = Math.round(Math.random() * 3)+1;
        this.speedY = 0;
        
        if(Math.random()>0.5) this.speedX *= -1;
    }

    public move(): void
    {
        this.x += this.speedX;

        if( this.x > window.innerWidth || this.x < -10) { 
            this.speedX *= -1;  
        }

        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    }

    public remove() : void
    {
        this.div.remove();
    }
}