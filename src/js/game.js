import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Wizard } from './wizard.js'
import { Spell } from './spell.js'

export class Game extends Engine {

    constructor() {
        super({ 
            width: 1920,
            height: 1080,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
         })
        this.start(ResourceLoader).then(() => {
            this.startGame()
        })
    }

    startGame() {
        console.log("start de game!")
        const wizard = new Wizard();
        const spell = new Spell();
        this.add(wizard);
        this.add(spell);
    }
}

new Game()
