import { Actor, SpriteSheet, Vector, range, Animation, AnimationStrategy } from "excalibur";
import { Resources } from "./resources";
import { Wizard } from './wizard';

export class Enemy extends Actor {
    wizard;

    constructor(wizard) {
        super({ width: 120, height: 120 });
        this.wizard = wizard;
    }

    onInitialize(engine) {
        this.on('collisionstart', (event) => {
            if (event.other instanceof Wizard) {
                if (this.wizard) {
                    this.wizard.takeHit(event);
                    this.die();
                }
            }
        });
    }

    die() {
        // @ts-ignore
        this.scene?.engine.addPoints(100);

        Resources.EnemyDeath.volume = 1.0;
        Resources.EnemyDeath.loop = false;
        Resources.EnemyDeath.play();

        this.graphics.use("death");
        this.vel = Vector.Zero;

        const deathAnimation = this.graphics.current;
        if (deathAnimation instanceof Animation) {
            deathAnimation.events.on("end", () => {
                this.kill();
            });
        }
    }
}

export class Skeleton extends Enemy {
    constructor(wizard, spawnLeft, velocityX) {
        super(wizard);
        this.spawnLeft = spawnLeft;
        this.velocityX = velocityX;
    }

    onInitialize(engine) {
        super.onInitialize(engine);

        const spawnX = this.spawnLeft ? -69 : 2000;
        this.pos = new Vector(spawnX, 690);
        this.vel = new Vector(this.velocityX, 0);

        const skeletonRunSheet = SpriteSheet.fromImageSource({
            image: Resources.RunSkeleton,
            grid: { rows: 1, columns: 4, spriteWidth: 150, spriteHeight: 150 }
        });
        const skeletonDeathSheet = SpriteSheet.fromImageSource({
            image: Resources.DeathSkeleton,
            grid: { rows: 1, columns: 4, spriteWidth: 150, spriteHeight: 150 }
        });

        const skeletonRunFrames = Animation.fromSpriteSheet(skeletonRunSheet, range(0, 3), 100);
        skeletonRunFrames.scale = new Vector(2.5, 2.5);

        if (!this.spawnLeft) {
            skeletonRunFrames.flipHorizontal = true;
        }

        this.graphics.add("run", skeletonRunFrames);

        const skeletonDeathFrames = Animation.fromSpriteSheet(skeletonDeathSheet, range(0, 3), 100, AnimationStrategy.Freeze);
        skeletonDeathFrames.scale = new Vector(2.5, 2.5);
        this.graphics.add("death", skeletonDeathFrames);

        this.graphics.use("run");
    }
}

export class Goblin extends Enemy {
    constructor(wizard, spawnLeft, velocityX) {
        super(wizard);
        this.spawnLeft = spawnLeft;
        this.velocityX = velocityX;
    }

    onInitialize(engine) {
        super.onInitialize(engine);

        const spawnX = this.spawnLeft ? -69 : 2000;
        const spawnY = 650;
        const adjustedSpawnY = spawnY + (this.spawnLeft ? 30 : 30);

        this.pos = new Vector(spawnX, adjustedSpawnY);
        this.vel = new Vector(this.velocityX, 0);

        const goblinRunSheet = SpriteSheet.fromImageSource({
            image: Resources.RunGoblin,
            grid: { rows: 1, columns: 8, spriteWidth: 150, spriteHeight: 150 }
        });
        const goblinDeathSheet = SpriteSheet.fromImageSource({
            image: Resources.DeathGoblin,
            grid: { rows: 1, columns: 4, spriteWidth: 150, spriteHeight: 150 }
        });

        const goblinRunFrames = Animation.fromSpriteSheet(goblinRunSheet, range(0, 7), 150);
        goblinRunFrames.scale = new Vector(3, 3);

        if (!this.spawnLeft) {
            goblinRunFrames.flipHorizontal = true;
        }

        this.graphics.add("run", goblinRunFrames);

        const goblinDeathFrames = Animation.fromSpriteSheet(goblinDeathSheet, range(0, 3), 100, AnimationStrategy.Freeze);
        goblinDeathFrames.scale = new Vector(3, 3);
        this.graphics.add("death", goblinDeathFrames);

        this.graphics.use("run");
    }
}


