import '../css/style.css';
import { Actor, Engine, Vector, DisplayMode, Timer, Keys, Sound, Resource, SolverStrategy } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { Wizard } from './wizard.js';
import { Health } from './health.js';
import { Background } from './background.js';
import { Goblin, Skeleton } from './enemy.js';
import { UI } from './ui.js';
import { Start } from './start.js';
// @ts-ignore
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
            displayMode: DisplayMode.FitScreen,
        });

        this.elapsedTime = 0;
        this.createElapsedTimeTimer();

        this.start(ResourceLoader).then(() => {
            this.startGame();
        });
    }

    createElapsedTimeTimer() {
        this.elapsedTimeTimer = new Timer({
            fcn: () => this.elapsedTime++,
            interval: 1000,
            repeats: true
        });
        this.add(this.elapsedTimeTimer);
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
        this.wizard.canCastSpells = true;
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
        // @ts-ignore
        this.elapsedTimeTimer.start();
    }

    spawn() {
        const elapsedTimeInSeconds = this.elapsedTime;
        const spawnProbability = Math.min(0.4 + elapsedTimeInSeconds * (0.75 / 100), 1.0);

        if (!this.spawnEnded) {
            const spawnLeft = Math.random() < 0.5;

            if (Math.random() < spawnProbability) {
                const velocityX = spawnLeft ? 50 : -50;
                this.add(new Skeleton(this.wizard, spawnLeft, velocityX));
            }
            if (Math.random() < spawnProbability) {
                const velocityX = spawnLeft ? 75 : -75;
                this.add(new Goblin(this.wizard, spawnLeft, velocityX));
            }
        }
    }

    stopAll() {
        this.spawnEnded = true;
        Resources.Music.stop();
        this.currentScene.actors.forEach(actor => actor.kill());
        // @ts-ignore
        this.elapsedTimeTimer.stop();
        this.end();
    }

    end() {
        this.gameEnded = true;
        this.wizard.canCastSpells = false;
        this.allowInput = false;
    
        Resources.GameOver.volume = 1.0;
        Resources.GameOver.loop = false;
        Resources.GameOver.play();
    
        const finalScore = this.score;
        const end = new End(finalScore);
        this.add(end);
    
        if (this.spaceKeyListener) {
            this.input.keyboard.off('down', this.spaceKeyListener);
        }
    
        setTimeout(() => {
            this.allowInput = true;
            this.spaceKeyListener = (evt) => {
                if (evt.key === Keys.Space && this.allowInput) {
                    this.restart();
                }
            };
    
            this.input.keyboard.on('down', this.spaceKeyListener);
        }, 2000);
    }
    
    restart() {
        if (!this.allowInput) return;
    
        this.currentScene.actors.forEach(actor => {
            if (actor instanceof End) {
                actor.kill();
            }
        });
    
        this.score = 0;
        this.elapsedTime = 0;
        // @ts-ignore
        this.elapsedTimeTimer.reset();
    
        this.startGame();
    }
}

new Game();
