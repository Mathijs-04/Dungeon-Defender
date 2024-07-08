import { Actor, Keys, Vector, SpriteSheet, Animation, range, clamp } from "excalibur";
import { Resources } from "./resources";
import { Spell } from "./spell";
import { Health } from "./health";

export class Wizard extends Actor {
    health;
    currentGraphicKey = "idle";
    lastDirection = "right";
    attackCooldown = 1000;
    lastAttackTime = 0;
    isAttacking = false;
    attackDuration = 600;
    attackHandler;

    constructor(health, game) {
        super({ width: 120, height: 120 });
        this.health = health;
        this.game = game;
        this.canCastSpells = false;
    }

    onInitialize(engine) {
        const idleSheet = SpriteSheet.fromImageSource({
            image: Resources.IdleWizard,
            grid: { rows: 1, columns: 6, spriteWidth: 231, spriteHeight: 190 }
        });

        const idleFrames = range(0, 5);
        const idle = Animation.fromSpriteSheet(idleSheet, idleFrames, 100);

        const runSheet = SpriteSheet.fromImageSource({
            image: Resources.RunWizard,
            grid: { rows: 1, columns: 8, spriteWidth: 231, spriteHeight: 190 }
        });

        const runLeft = Animation.fromSpriteSheet(runSheet, range(0, 7), 100);
        const runRight = runLeft.clone();
        runRight.flipHorizontal = true;

        idle.scale = new Vector(2, 2);
        runLeft.scale = new Vector(2, 2);
        runRight.scale = new Vector(2, 2);

        this.graphics.add("idle", idle);
        this.graphics.add("runleft", runLeft);
        this.graphics.add("runright", runRight);

        this.graphics.use("idle");

        this.pos = new Vector(960, 680);
        this.vel = new Vector(0, 0);

        this.attackHandler = (evt) => {
            if (evt.key === Keys.Space) {
                this.attack();
            }
        };

        engine.input.keyboard.on('down', this.attackHandler);
    }

    onPostUpdate(engine) {
        if (this.isAttacking) {
            return;
        }

        let xspeed = 0;

        if (engine.input.keyboard.isHeld(Keys.Left) || engine.input.keyboard.isHeld(Keys.A)) {
            xspeed = -400;
            this.graphics.use("runright");
            this.currentGraphicKey = "runright";
            this.lastDirection = "left";
        } else if (engine.input.keyboard.isHeld(Keys.Right) || engine.input.keyboard.isHeld(Keys.D)) {
            xspeed = 400;
            this.graphics.use("runleft");
            this.currentGraphicKey = "runleft";
            this.lastDirection = "right";
        } else {
            this.graphics.use("idle");
            this.currentGraphicKey = "idle";
        }

        if (this.graphics.current) {
            this.graphics.current.flipHorizontal = (this.lastDirection === "left");
        }

        this.vel = new Vector(xspeed, 0);

        this.pos.x = clamp(this.pos.x, 0, 1920);
        this.pos.y = clamp(this.pos.y, 0, 1080);
    }

    attack() {
        this.vel = new Vector(0, 0);

        const currentTime = Date.now();
        if (currentTime - this.lastAttackTime < this.attackCooldown || this.isAttacking) {
            return;
        }

        this.isAttacking = true;
        this.lastAttackTime = currentTime;
        
        this.graphics.remove("attack");
        
        const attackSheet = SpriteSheet.fromImageSource({
            image: Resources.AttackWizard,
            grid: { rows: 1, columns: 8, spriteWidth: 231, spriteHeight: 190 }
        });
        
        const attackFrames = range(0, 7);
        const attack = Animation.fromSpriteSheet(attackSheet, attackFrames, 80);
        attack.scale = new Vector(2, 2);
        
        this.graphics.add("attack", attack);
        this.graphics.use("attack");
        
        if (this.graphics.current) {
            this.graphics.current.flipHorizontal = (this.lastDirection === "left");
        }
        
        const xOffset = this.lastDirection === "right" ? 100 : -100;

        if (this.canCastSpells) {
            Resources.SpellSound.volume = 1.0;
            Resources.SpellSound.loop = false;
            Resources.SpellSound.play();
        }

        setTimeout(() => {
            if (!this.canCastSpells) return;

            const spellSpawnPosition = this.pos.clone().add(new Vector(xOffset, 0));
            const spell = new Spell(new Vector(this.lastDirection === "right" ? 1 : -1, 0), spellSpawnPosition);
            this.game.add(spell);
        }, 400);
        
        setTimeout(() => {
            this.graphics.remove("attack");
            this.isAttacking = false;
            this.graphics.use("idle");
        }, this.attackDuration);
    }

    takeHit() {
        Resources.WizardHit.volume = 0.5;
        Resources.WizardHit.loop = false;
        Resources.WizardHit.play();
        this.actions.blink(100, 100, 5);
        this.health.decreaseHealth(1);
        if (this.health.currentHealth === 0) {
            this.die();
        }
    }

    die() {
        this.kill();
        this.game.stopAll();
    }

    onPreKill(engine) {
        engine.input.keyboard.off('down', this.attackHandler);
    }
}
