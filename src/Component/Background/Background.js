import React, {Component} from 'react';
import Phaser from 'phaser';

class Background extends Component{
    game = {};
    bg = '';

    componentDidMount(){
        const renderOptions = {
            width: 375,
            height: 667,
            renderer: Phaser.AUTO,
            parent: 'render-game',
            scene: {
                preload: this.preload,
                create: this.create,
                update: this.update
            }
        }
        this.game = new Phaser.Game(renderOptions)
    }

    preload(){
        this.load.image('background', 'https://examples.phaser.io/assets/games/invaders/starfield.png')
    }

create() {
    this.bg = this.add.tileSprite(0, 0, this.game.config.width * 2, this.game.config.height * 2, 'background');
    console.log(this.game)

    // this.bg = this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'background');
    // this.bg.setDisplaySize(this.game.config.width, this.game.config.height);
}

update() {
    this.bg.tilePositionY -= 5;
}

    render(){
        return(
            <div id='render-game'/>
        )
    }
}
export default Background;