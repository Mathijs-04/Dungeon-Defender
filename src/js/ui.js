import { Label, FontUnit, Font, Vector, Actor, Color } from "excalibur";

export class UI extends Actor {
    scoreLabel;

    constructor() {
        super();
        this.scoreLabel = new Label({
            text: "SCORE: 0",
            pos: new Vector(830, 1000),
            color: Color.White,
            font: new Font({
                size: 60,
                unit: FontUnit.Px,
                family: "Fantasy-Font"
            })
        });
    }

    updateScore(score) {
        this.scoreLabel.text = `SCORE: ${score}`;
    }

    onInitialize(engine) {
        engine.add(this.scoreLabel);
        this.updateScore(0);
    }
}
