import { ImageSource, Sound, Resource, Loader } from 'excalibur';
import { Background } from './background';

const Resources = {
    Background: new ImageSource('images/Background.jpg'),
    Idle: new ImageSource('images/Idle.png'),
    Run: new ImageSource('images/Run.png'),
};

const ResourceLoader = new Loader();
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res);
}

export { Resources, ResourceLoader };