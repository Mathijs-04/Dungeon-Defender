import { Actor, Vector, Sprite } from "excalibur";
import { Resources } from "./resources";

export class Start extends Actor {
    sprite;

    onInitialize(engine) {
        Resources.StartImage.load().then(() => {
            this.sprite = new Sprite({
                image: Resources.StartImage,
                sourceView: { x: 0, y: 0, width: engine.drawWidth, height: engine.drawHeight }
            });
            this.anchor = Vector.Zero;
            this.graphics.use(this.sprite);
            
            this.sprite.scale = new Vector(1, 1);
        });
    }
}