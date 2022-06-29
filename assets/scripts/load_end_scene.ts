import { _decorator, Component, CCObject, Button, SceneAsset, Scene, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('load_end_scene')
export class load_end_scene extends Component {
    onLoad(){
        
        this.node.on('touchend',this.loadScene,this);
    }
    loadScene(){
        //console.log(this.node.getChildByName("Label").getComponent(Label).string);
        //this.node.getChildByName("Label").getComponent(Label).string="button11";
        //console.log(this.node.getChildByName("Label").getComponent(Label).string);
        director.loadScene("end_scene");
    }
}

