import { Actor, Keys, Vector } from "excalibur";
import { Resources } from "./resources";

export class Spell extends Actor {
// constructor() {
//         super(
//             {
//                 width: 25,
//                 height: 25
//             }
//         );
//     }

    onInitialize(engine) {
        this.graphics.use(Resources.Spell.toSprite());
        this.pos = new Vector(1000, 400);
        this.vel = new Vector(50,10);
    }
}