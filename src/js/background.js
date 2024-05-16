import { Actor, Sprite, Vector } from "excalibur";
import { Resources } from "./resources";

export class Background extends Actor {
    sprite;

    onInitialize(engine) {
        Resources.Background.load().then(() => {
            this.sprite = new Sprite({
                image: Resources.Background,
                sourceView: { x: 0, y: 0, width: engine.drawWidth, height: engine.drawHeight }
            });
            this.anchor = Vector.Zero;
            this.graphics.use(this.sprite);

            this.sprite.scale = new Vector(1.7, 1.7);
        });
    }
}