import { ImageSource, Sound, Resource, Loader, FontSource } from 'excalibur';

const Resources = {
    Background: new ImageSource('images/Background.png'),
    StartImage: new ImageSource('images/Start.png'),
    EndImage: new ImageSource('images/End.png'),

    IdleWizard: new ImageSource('images/IdleWizard.png'),
    RunWizard: new ImageSource('images/RunWizard.png'),
    AttackWizard: new ImageSource('images/AttackWizard.png'),

    Spell: new ImageSource('images/Spell.png'),

    RunSkeleton: new ImageSource('images/RunSkeleton.png'),
    DeathSkeleton: new ImageSource('images/DeathSkeleton.png'),

    RunGoblin: new ImageSource('images/RunGoblin.png'),
    DeathGoblin: new ImageSource('images/DeathGoblin.png'),

    HeartFull: new ImageSource('images/HeartFull.png'),
    HeartEmpty: new ImageSource('images/HeartEmpty.png'),

    Music: new Sound('audio/Music.mp3'),
    SpellSound: new Sound('audio/Spell.mp3'),
    WizardHit: new Sound('audio/WizardHit.mp3'),
    EnemyDeath: new Sound('audio/EnemyDeath.mp3'),
    GameOver: new Sound('audio/GameOver.mp3'),

    FantasyFont: new FontSource('font/Fantasy-font.woff', 'Fantasy-Font'),
};

const ResourceLoader = new Loader();
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res);
}

export { Resources, ResourceLoader };
