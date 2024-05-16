import { ImageSource, Sound, Resource, Loader } from 'excalibur';
import { Background } from './background';

const Resources = {
    Background: new ImageSource('images/Background.jpg'),
    IdleWizard: new ImageSource('images/IdleWizard.png'),
    RunWizard: new ImageSource('images/RunWizard.png'),
    IdleSkeleton: new ImageSource('images/IdleSkeleton.png'),
    RunSkeleton: new ImageSource('images/RunSkeleton.png'),
    IdleGoblin: new ImageSource('images/IdleGoblin.png'),
    RunGoblin: new ImageSource('images/RunGoblin.png'),
    RunBat: new ImageSource('images/RunBat.png'),
};

const ResourceLoader = new Loader();
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res);
}

export { Resources, ResourceLoader };