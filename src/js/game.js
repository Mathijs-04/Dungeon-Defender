import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Wizard } from './wizard.js'
import { Background } from './background.js'

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
        const background = new Background();
        this.add(background);
        const wizard = new Wizard();
        this.add(wizard);
    }
}

new Game()