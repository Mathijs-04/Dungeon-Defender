import '../css/style.css';
import { Actor, Engine, Vector, DisplayMode } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { Wizard } from './wizard.js';
import { Health } from './health.js';
import { Background } from './background.js';
import { Spawner } from './spawner.js';

export class Game extends Engine {
    constructor() {
        super({
            width: 1920,
            height: 1080,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
        });

        this.start(ResourceLoader).then(() => {
            this.startGame();
        });
    }

    startGame() {
        const background = new Background();
        const wizard = new Wizard();
        const heart = new Health(3);
        const spawner = new Spawner();

        this.add(background);
        this.add(wizard);
        this.add(heart);
        this.add(spawner);
    }
}

new Game();
