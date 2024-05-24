import '../css/style.css';
import { Actor, Engine, Vector, DisplayMode, Timer, Keys, Sound } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { Wizard } from './wizard.js';
import { Health } from './health.js';
import { Background } from './background.js';
import { Goblin, Skeleton } from './enemy.js';
import { UI } from './ui.js';
import { Start } from './start.js';
import { End } from './end.js';

export class Game extends Engine {
    score = 0;
    ui;
    wizard;
    gameStarted = false;
    gameEnded = false;
    spawnEnded = false;
    spaceKeyListener;

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

        this.elapsedTime = 0;
        this.elapsedTimeTimer = new Timer({
            fcn: () => this.elapsedTime++,
            interval: 1000,
            repeats: true
        });
        this.add(this.elapsedTimeTimer);
        this.elapsedTimeTimer.start();

        this.start(ResourceLoader).then(() => {
            this.startGame();
        });
    }

    startGame() {
        this.gameEnded = false;
        this.gameStarted = false;
        this.spawnEnded = true;

        const start = new Start();
        this.add(start);
        Resources.Music.volume = 0.5;
        Resources.Music.loop = true;
        Resources.Music.play();

        if (this.spaceKeyListener) {
            this.input.keyboard.off('down', this.spaceKeyListener);
        }

        this.spaceKeyListener = (evt) => {
            if (evt.key === Keys.Space) {
                if (!this.gameStarted) {
                    this.runGame();
                    this.gameStarted = true;
                }
            }
        };

        this.input.keyboard.on('down', this.spaceKeyListener);
    }

    runGame() {
        this.timer = new Timer({
            fcn: () => this.spawn(),
            interval: 2000,
            repeats: true
        });
        this.add(this.timer);
        this.timer.start();

        const background = new Background();
        const heart = new Health(3);
        this.wizard = new Wizard(heart, this);
        this.ui = new UI();

        this.add(background);
        this.add(this.wizard);
        this.add(heart);
        this.add(this.ui);

        this.currentScene.actors.forEach(actor => {
            if (actor instanceof Start) {
                actor.kill();
            }
        });

        this.spawnEnded = false;
        this.elapsedTime = 0;
    }

    spawn() {
        const elapsedTimeInSeconds = this.elapsedTime;
        const spawnProbability = Math.min(0.4 + elapsedTimeInSeconds * (0.75 / 100), 1.0);

        if (!this.spawnEnded) {
            if (Math.random() < spawnProbability) {
                this.add(new Skeleton(this.wizard));
            }
            if (Math.random() < spawnProbability) {
                this.add(new Goblin(this.wizard));
            }
        }
    }

    stopAll() {
        this.spawnEnded = true;
        Resources.Music.stop();
        this.currentScene.actors.forEach(actor => actor.kill());
        this.end();
    }

    end() {
        this.gameEnded = true;
        const finalScore = this.score;
        const end = new End(finalScore);
        this.add(end);

        if (this.spaceKeyListener) {
            this.input.keyboard.off('down', this.spaceKeyListener);
        }

        this.spaceKeyListener = (evt) => {
            if (evt.key === Keys.Space) {
                this.restart();
            }
        };

        this.input.keyboard.on('down', this.spaceKeyListener);
    }

    restart() {
        this.currentScene.actors.forEach(actor => {
            if (actor instanceof End) {
                actor.kill();
            }
        });

        this.score = 0;
        this.elapsedTime = 0;

        this.startGame();
    }
}

new Game();
