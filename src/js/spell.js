import { Actor, Vector, SpriteSheet, Animation, range } from "excalibur";
import { Resources } from './resources';

export class Spell extends Actor {
    onInitialize(engine) {
        this.pos = new Vector(0, 0);
        this.vel = new Vector(0, 0);

        const spellSheet = SpriteSheet.fromImageSource({
            image: Resources.Spell,
            grid: { rows: 1, columns: 7, spriteWidth: 124, spriteHeight: 108 }
        });

        const spellAnimation = Animation.fromSpriteSheet(spellSheet, range(0, 6), 200);

        this.graphics.add("spell", spellAnimation);
        this.graphics.use("spell");
    }
}