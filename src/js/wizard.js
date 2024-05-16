import { Actor, Keys, Vector, SpriteSheet, Animation, range } from "excalibur";
import { Resources } from "./resources";

export class Wizard extends Actor {
    onInitialize(engine) {
        const idleSheet = SpriteSheet.fromImageSource({
            image: Resources.Idle,
            grid: { rows: 1, columns: 6, spriteWidth: 231, spriteHeight: 190 }
        });

        const idleFrames = range(0, 7);
        const idle = Animation.fromSpriteSheet(idleSheet, idleFrames, 100);

        const runSheet = SpriteSheet.fromImageSource({
            image: Resources.Run,
            grid: { rows: 1, columns: 8, spriteWidth: 231, spriteHeight: 190 }
        });

        const runLeft = Animation.fromSpriteSheet(runSheet, range(0, 7), 100);
        const runRight = runLeft.clone();
        runRight.flipHorizontal = true;

        idle.scale = new Vector(2, 2);
        runLeft.scale = new Vector(2, 2);
        runRight.scale = new Vector(2, 2);

        this.graphics.add("idle", idle);
        this.graphics.add("runleft", runLeft);
        this.graphics.add("runright", runRight);

        this.graphics.use("idle");

        this.graphics.use("idle");
        this.pos = new Vector(960, 630);
        this.vel = new Vector(0, 0);
    }

    onPostUpdate(engine) {
        let xspeed = 0;
        let sprite = this.graphics.current;

        if (engine.input.keyboard.isHeld(Keys.Left) || engine.input.keyboard.isHeld(Keys.A)) {
            xspeed = -400;
            this.graphics.use("runright");
        }
        else if (engine.input.keyboard.isHeld(Keys.Right) || engine.input.keyboard.isHeld(Keys.D)) {
            xspeed = 400;
            this.graphics.use("runleft");
        }
        else {
            this.graphics.use("idle");
        }

        this.vel = new Vector(xspeed, 0);
    }
}