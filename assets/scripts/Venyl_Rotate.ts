import { _decorator, Component, Node, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Venyl_Rotate')
export class Venyl_Rotate extends Component {
    @property(Sprite)
    public _rotating:boolean; //判断是否旋转
    public _rotation_z:number=0;

    start() {
        this._rotating=false;
    }

    update(deltaTime: number) {
        if(this._rotating==true){
            this.node.setRotationFromEuler(0,0,--this._rotation_z);
        }
        else {
            this._rotation_z=0;
            this.node.setRotationFromEuler(0,0,this._rotation_z);
        }
    }
}

