import { ImageSource, Sound, Resource, Loader } from 'excalibur';

const Resources = {
    Background: new ImageSource('images/Background.png'),

    IdleWizard: new ImageSource('images/IdleWizard.png'),
    RunWizard: new ImageSource('images/RunWizard.png'),
    JumpWizard: new ImageSource('images/JumpWizard.png'),
    AttackWizard: new ImageSource('images/AttackWizard.png'),

    Spell: new ImageSource('images/Spell.png'),

    RunSkeleton: new ImageSource('images/RunSkeleton.png'),

    RunGoblin: new ImageSource('images/RunGoblin.png'),

    RunBat: new ImageSource('images/RunBat.png'),

    HeartFull: new ImageSource('images/HeartFull.png'),
    HeartEmpty: new ImageSource('images/HeartEmpty.png'),
};

const ResourceLoader = new Loader();
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res);
}

export { Resources, ResourceLoader };