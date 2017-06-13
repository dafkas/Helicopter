class Utils {
    public static checkCollision(bullet:Bullet, enemy:Enemy):boolean
    {
        return (bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.height + bullet.y > enemy.y);
    }
}