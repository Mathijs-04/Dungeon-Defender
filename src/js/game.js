import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, BoundingBox } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Wizard } from './wizard.js'
import { Health } from './health.js'
import { Background } from './background.js'
import { Goblin, Skeleton } from './enemy.js'
import { UI } from './ui.js';

export class Game extends Engine {
    score = 0;
    ui;

    addPoints(points) {
        this.score += points;
        this.ui.updateScore(this.score);
    }

    constructor() {
        super({
            width: 1920,
            height: 1080,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
        })

        this.start(ResourceLoader).then(() => {
            this.startGame()
        })
    }

    startGame() {
        const background = new Background();
        const wizard = new Wizard();
        const skeleton = new Skeleton();
        const goblin = new Goblin();
        const heart = new Health(3);
        this.ui = new UI();
        this.add(background);
        this.add(wizard);
        this.add(skeleton);
        this.add(goblin);
        this.add(heart);
        this.add(this.ui);

        Resources.Music.volume = 0.5;
        Resources.Music.loop = true;
        Resources.Music.play();
    }
}

new Game()