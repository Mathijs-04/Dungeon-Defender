import { Label, FontUnit, Font, Vector, Actor, Color } from "excalibur";

export class UI extends Actor {
    scoreLabel;

    updateScore(score) {
        this.scoreLabel.text = `SCORE: ${score}`;
    }

    onInitialize(engine) {
        this.scoreLabel = new Label({
            text: "SCORE: 0",
            pos: new Vector(840, 1000),
            color: Color.White,
            font: new Font({
                size: 60,
                unit: FontUnit.Px,
                family: "Fantasy-Font"
            })
        });
        engine.add(this.scoreLabel);
    }
}