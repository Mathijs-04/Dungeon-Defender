import { Label, FontUnit, Font, Vector, Actor, Color } from "excalibur";

export class UI extends Actor {
    scoreLabel;

    updateScore(score) {
        this.scoreLabel.text = `SCORE: ${score}`;
    }

    onInitialize(engine) {
        this.scoreLabel = new Label({
            text: "SCORE: 0",
            pos: new Vector(855, 1000),
            color: Color.White,
            font: new Font({
                size: 50,
                unit: FontUnit.Px,
                family: "Arial"
            })
        });
        engine.add(this.scoreLabel);
    }
}