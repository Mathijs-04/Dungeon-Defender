import { ImageSource, Sound, Resource, Loader } from 'excalibur';
import { Background } from './background';

const Resources = {
    Background: new ImageSource('images/Background.jpg'),
    IdleWizard: new ImageSource('images/IdleWizard.png'),
    RunWizard: new ImageSource('images/RunWizard.png'),
};

const ResourceLoader = new Loader();
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res);
}

export { Resources, ResourceLoader };