import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import { Spell } from './spell'

// voeg hier jouw eigen resources toe
const Resources = {
    Wizard: new ImageSource('images/Wizard.png'),
    Spell: new ImageSource('images/Spell.png'),
}




const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }