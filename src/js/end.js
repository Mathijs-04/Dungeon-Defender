import { Actor, Vector, Sprite, Label, Color, Font, FontUnit } from "excalibur";
import { Resources } from "./resources";

export class End extends Actor {
    sprite;
    finalScoreLabel;
    highScoreLabel;

    constructor(finalScore) {
        super();

        const storedHighScore = localStorage.getItem('highScore');
        let highScore;

        if (storedHighScore) {
            highScore = parseInt(storedHighScore);
        } else {
            highScore = 0;
        }

        this.finalScoreLabel = new Label({
            text: finalScore.toString(),
            pos: new Vector(1000, 800),
            color: Color.White,
            font: new Font({
                size: 75,
                unit: FontUnit.Px,
                family: "Arial"
            })
        });

        this.highScoreLabel = new Label({
            text: highScore.toString(),
            pos: new Vector(1000, 925),
            color: Color.White,
            font: new Font({
                size: 75,
                unit: FontUnit.Px,
                family: "Arial"
            })
        });

        if (finalScore > highScore) {
            localStorage.setItem('highScore', JSON.stringify(finalScore));
            this.highScoreLabel.text = finalScore;
        }
    }

    onInitialize(engine) {
        Resources.EndImage.load().then(() => {
            this.sprite = new Sprite({
                image: Resources.EndImage,
                sourceView: { x: 0, y: 0, width: engine.drawWidth, height: engine.drawHeight }
            });
            
            this.anchor = Vector.Zero;
            this.graphics.use(this.sprite);
            this.sprite.scale = new Vector(1, 1);

            engine.add(this.finalScoreLabel);
            engine.add(this.highScoreLabel);
        });
    }
}
