import { Actor, Vector, SpriteSheet, Animation, range } from "excalibur";
import { Resources } from './resources';
import { Enemy } from "./enemy";

export class Spell extends Actor {
    constructor(direction, wizardPosition) {
        super({ width: 80, height: 80 });

        this.pos.y = 640;
        this.pos.x = wizardPosition.x + (direction.x > 0 ? 50 : -50);
        this.vel = direction.scale(500);
    }

    onInitialize(engine) {
        const spellSheet = SpriteSheet.fromImageSource({
            image: Resources.Spell,
            grid: { rows: 1, columns: 7, spriteWidth: 124, spriteHeight: 108 }
        });

        const spellAnimation = Animation.fromSpriteSheet(spellSheet, range(0, 6), 75);

        this.graphics.add("spell", spellAnimation);
        this.graphics.use("spell");

        this.on('collisionstart', (event) => this.hitSomething(event));
    }

    hitSomething(event) {
        if (event.other instanceof Enemy) {
            event.other.die();
            this.kill();
        }
    }
}
