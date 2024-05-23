import { Actor, Vector, Sprite } from "excalibur";
import { Resources } from "./resources";

export class Start extends Actor {
    sprite;

    onInitialize(engine) {
        if (Resources.StartImage && typeof Resources.StartImage.load === 'function') {
            Resources.StartImage.load().then(() => {
                this.sprite = new Sprite({
                    image: Resources.StartImage,
                    sourceView: { x: 0, y: 0, width: engine.drawWidth, height: engine.drawHeight }
                });
                this.anchor = Vector.Zero;
                this.graphics.use(this.sprite);
                this.sprite.scale = new Vector(1, 1);
            }).catch(error => {
                console.error("Error loading StartImage resource:", error);
            });
        } else {
            console.error("Resources.StartImage is not defined or does not have a load method");
        }
    }
}
