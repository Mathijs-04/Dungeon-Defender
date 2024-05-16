import { Actor, Keys, Vector, SpriteSheet, Animation, range } from "excalibur";
import { Resources } from "./resources";

export class Wizard extends Actor {
    onInitialize(engine) {
        // Assuming you have added these to your Resources
        const idleSheet = SpriteSheet.fromImageSource({
            image: Resources.Idle,
            grid: { rows: 1, columns: 6, spriteWidth: 256, spriteHeight: 256 }
        });
        
        // Add these lines to create an idle animation
        const idleFrames = range(0, 5); // Adjust range as needed
        const idle = Animation.fromSpriteSheet(idleSheet, idleFrames, 80); // Adjust speed as needed
        
        const runSheet = SpriteSheet.fromImageSource({
            image: Resources.Run,
            grid: { rows: 1, columns: 8, spriteWidth: 256, spriteHeight: 256 }
        });
        
        const runLeft = Animation.fromSpriteSheet(runSheet, range(0, 7), 80);
        const runRight = runLeft.clone();
        runRight.flipHorizontal = true;
        
        this.graphics.add("idle", idle);
        this.graphics.add("runleft", runLeft);
        this.graphics.add("runright", runRight);
        
        // Use the idle animation as the default sprite
        this.graphics.use("idle");

        // Use the idle animation as the default sprite
        this.graphics.use("idle");
        this.pos = new Vector(100, 100);
        this.vel = new Vector(0,0);
    }

    onPostUpdate(engine) {
        let xspeed = 0;
        let sprite = this.graphics.current;

        if (engine.input.keyboard.isHeld(Keys.Left) || engine.input.keyboard.isHeld(Keys.A)) {
            xspeed = -250;
            this.graphics.use("runright"); // Use runright when moving left
        }
        else if (engine.input.keyboard.isHeld(Keys.Right) || engine.input.keyboard.isHeld(Keys.D)) {
            xspeed = 250;
            this.graphics.use("runleft"); // Use runleft when moving right
        }
        else {
            this.graphics.use("idle");
        }

        this.vel = new Vector(xspeed, 0);
    }
}