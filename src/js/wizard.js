import { Actor, Keys, Vector, SpriteSheet, Animation, range, clamp } from "excalibur";
import { Resources } from "./resources";
import { Spell } from "./spell";

export class Wizard extends Actor {
    currentGraphicKey = "idle";
    lastDirection = "right";

    onInitialize(engine) {
        const idleSheet = SpriteSheet.fromImageSource({
            image: Resources.IdleWizard,
            grid: { rows: 1, columns: 6, spriteWidth: 231, spriteHeight: 190 }
        });

        const idleFrames = range(0, 7);
        const idle = Animation.fromSpriteSheet(idleSheet, idleFrames, 100);

        const runSheet = SpriteSheet.fromImageSource({
            image: Resources.RunWizard,
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
        this.pos = new Vector(960, 660);
        this.vel = new Vector(0, 0);

        engine.input.keyboard.on('down', (evt) => {
            if (evt.key === Keys.Space) {
                this.attack();
            }
        });
    }

    onPostUpdate(engine) {
        let xspeed = 0;

        if (engine.input.keyboard.isHeld(Keys.Left) || engine.input.keyboard.isHeld(Keys.A)) {
            xspeed = -400;
            this.graphics.use("runright");
            this.currentGraphicKey = "runright";
            this.lastDirection = "left";
        }
        else if (engine.input.keyboard.isHeld(Keys.Right) || engine.input.keyboard.isHeld(Keys.D)) {
            xspeed = 400;
            this.graphics.use("runleft");
            this.currentGraphicKey = "runleft";
            this.lastDirection = "right";
        }
        else {
            this.graphics.use("idle");
            this.currentGraphicKey = "idle";
        }

        this.vel = new Vector(xspeed, 0);

        this.pos.x = clamp(this.pos.x, 0, 1920);
        this.pos.y = clamp(this.pos.y, 0, 1080);
    }

    attack() {
        let direction;
        if (this.currentGraphicKey === "idle") {
            direction = this.lastDirection === "right" ? new Vector(1, 0) : new Vector(-1, 0);
        } else if (this.currentGraphicKey === "runright") {
            direction = new Vector(-1, 0);
        } else {
            direction = new Vector(1, 0);
        }
        const spell = new Spell(direction);
        this.addChild(spell);
    }
}