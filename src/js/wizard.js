import { Actor, Keys, Vector } from "excalibur";
import { Resources } from "./resources";

export class Wizard extends Actor {
    onInitialize(engine) {
        this.graphics.use(Resources.Wizard.toSprite());
        this.pos = new Vector(1000, 960);
        this.vel = new Vector(0,0);
    }

    onPostUpdate(engine) {
        let xspeed = 0;
        let sprite = this.graphics.current;
    
        if (engine.input.keyboard.isHeld(Keys.Left) || engine.input.keyboard.isHeld(Keys.A)) {
            xspeed = -250;
            if (sprite) sprite.flipHorizontal = false;
        }
        if (engine.input.keyboard.isHeld(Keys.Right) || engine.input.keyboard.isHeld(Keys.D)) {
            xspeed = 250;
            if (sprite) sprite.flipHorizontal = true;
        }
    
        this.vel = new Vector(xspeed, 0);
    }
}