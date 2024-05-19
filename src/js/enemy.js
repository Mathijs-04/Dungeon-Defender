import { Actor, SpriteSheet, Vector, range, Animation, AnimationStrategy } from "excalibur";
import { Resources } from "./resources";

export class Enemy extends Actor {
    constructor() {
        super({ width: 120, height: 120 });
    }

    die() {
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
    onInitialize(engine) {
        this.pos = new Vector(-69, 690);
        this.vel = new Vector(50, 0);

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
        this.graphics.add("run", skeletonRunFrames);

        const skeletonDeathFrames = Animation.fromSpriteSheet(skeletonDeathSheet, range(0, 3), 100, AnimationStrategy.Freeze);
        skeletonDeathFrames.scale = new Vector(2.5, 2.5);
        this.graphics.add("death", skeletonDeathFrames);

        this.graphics.use("run");
    }
}

export class Goblin extends Enemy {
    onInitialize(engine) {
        this.pos = new Vector(2000, 650);
        this.vel = new Vector(-75, 0);

        const goblinRunSheet = SpriteSheet.fromImageSource({
            image: Resources.RunGoblin,
            grid: { rows: 1, columns: 8, spriteWidth: 150, spriteHeight: 150 }
        });
        const goblinDeathSheet = SpriteSheet.fromImageSource({
            image: Resources.DeathGoblin,
            grid: { rows: 1, columns: 4, spriteWidth: 150, spriteHeight: 150 }
        });

        const goblinRunFrames = Animation.fromSpriteSheet(goblinRunSheet, range(0, 7), 100);
        goblinRunFrames.scale = new Vector(3, 3);
        goblinRunFrames.flipHorizontal = true;
        this.graphics.add("run", goblinRunFrames);

        const goblinDeathFrames = Animation.fromSpriteSheet(goblinDeathSheet, range(0, 3), 100, AnimationStrategy.Freeze);
        goblinDeathFrames.scale = new Vector(3, 3);
        goblinDeathFrames.flipHorizontal = true;
        this.graphics.add("death", goblinDeathFrames);

        this.graphics.use("run");
    }
}
