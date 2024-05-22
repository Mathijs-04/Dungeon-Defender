import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, BoundingBox, Timer } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Wizard } from './wizard.js'
import { Health } from './health.js'
import { Background } from './background.js'
import { Goblin, Skeleton } from './enemy.js'
import { UI } from './ui.js';

export class Game extends Engine {
    score = 0;
    ui;
    wizard;

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
        });
    
        this.start(ResourceLoader).then(() => {
            this.startGame();
        });
    
        this.elapsedTime = 0;
        this.elapsedTimeTimer = new Timer({
            fcn: () => this.elapsedTime++,
            interval: 1000,
            repeats: true
        });
        this.add(this.elapsedTimeTimer);
        this.elapsedTimeTimer.start();
    }

    startGame() {
        this.timer = new Timer({
            fcn: () => this.spawn(),
            interval: 2000,
            repeats: true
        });
        this.add(this.timer);
        this.timer.start();
    
        const background = new Background();
        const heart = new Health(3);
        this.wizard = new Wizard(heart);
        this.ui = new UI();
        
        this.add(background);
        this.add(this.wizard);
        this.add(heart);
        this.add(this.ui);
    
        Resources.Music.volume = 0.5;
        Resources.Music.loop = true;
        Resources.Music.play();
    }

    spawn() {
        const elapsedTimeInSeconds = this.elapsedTime;
    
        const spawnProbability = Math.min(0.25 + elapsedTimeInSeconds * (0.75 / 100), 1.0);

        console.log(`Current spawn chance: ${spawnProbability}`);
    
        if (Math.random() < spawnProbability) {
            this.add(new Skeleton(this.wizard));
        }
        if (Math.random() < spawnProbability) {
            this.add(new Goblin(this.wizard));
        }
    }
}

new Game();
