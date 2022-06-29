import { _decorator, Component, Node, Camera } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Set_OrthoHeight')
export class Set_OrthoHeight extends Component {
    @property(Camera)

    onLoad(){
        //设置相机的景深
        this.node.getComponent(Camera).orthoHeight=143.945;
    }
}

