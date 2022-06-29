import { _decorator, Component, CCObject, Button, SceneAsset, Scene, director} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('load_start_scene')
export class load_start_scene extends Component {
    onLoad(){
        
        this.node.on('touchend',this.loadScene,this);
    }
    loadScene(){
        director.loadScene("main_menu_scene");
    }
}

