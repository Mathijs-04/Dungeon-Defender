import { Actor, Vector, Sprite } from "excalibur";
import { Resources } from './resources.js';

export class Health extends Actor {
    constructor(initialHealth) {
        super();
        this.maxHealth = initialHealth;
        this.currentHealth = initialHealth;
        this.hearts = [];
    }

    onInitialize(engine) {
        for (let i = 0; i < this.maxHealth; i++) {
            const heart = new Actor();
            heart.pos = new Vector(850 + i * 120, 920);
            heart.graphics.add(Sprite.from(Resources.HeartFull));
            heart.scale = new Vector(0.5, 0.5);
            this.hearts.push(heart);
            engine.add(heart);
        }
    }

    updateHealth(newHealth) {
        this.currentHealth = newHealth;
        for (let i = 0; i < this.hearts.length; i++) {
            if (i < this.currentHealth) {
                this.hearts[i].graphics.use(Sprite.from(Resources.HeartFull));
            } else {
                this.hearts[i].graphics.use(Sprite.from(Resources.HeartEmpty));
            }
        }
    }

    decreaseHealth(amount) {
        this.currentHealth -= amount;
        if (this.currentHealth < 0) {
            this.currentHealth = 0;
        }
        this.updateHealth(this.currentHealth);
    }
}