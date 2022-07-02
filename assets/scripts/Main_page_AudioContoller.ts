import { _decorator, Component, Node, AudioSource, assert, Button, SpriteFrame, Sprite, Label, Color, color,resources, AudioClip } from 'cc';
import { CreateNewButton } from './CreateNewButton';
import { Venyl_Rotate } from './Venyl_Rotate';
const { ccclass, property } = _decorator;

@ccclass('Main_page_AudioContoller')
export class Main_page_AudioContoller extends Component {
    @property(AudioSource)
    public _audioSource:AudioSource=null!;
    public _playing:boolean=false;
    public _pressed:boolean=false;
    onLoad(){
        
        
        const audioSource=this.node.getComponent(AudioSource)!;
        assert(audioSource);
        this._audioSource=audioSource;
        /* resources.load("songs/test",AudioClip,(err,audioClip)=>{
            this._audioSource.clip=audioClip;
        }); */
        //this.node.on('touchend',this.button_pressed,this);
        //this.node.on('touchend',this.music_set,this);
        
        
        
    }
    music_set(){
        console.log(this._playing);
        //将所有其他节点切换到起始状态
        for(var i=0;i<this.node.parent.getComponentsInChildren(Main_page_AudioContoller).length;i++){
            console.log(i);
            var i_string:String=this.node.parent.getComponentsInChildren(Main_page_AudioContoller)[i].node.getChildByName("Song_name").getComponent(Label).string;
            var cur_string:String=this.node.getChildByName("Song_name").getComponent(Label).string;
            if(i_string==cur_string) continue;
            //音频初始状态
            this.node.parent.getComponentsInChildren(Main_page_AudioContoller)[i]._playing=false;
            this.node.parent.getComponentsInChildren(Main_page_AudioContoller)[i]._audioSource.pause();
            this.node.parent.getComponentsInChildren(Main_page_AudioContoller)[i]._audioSource.currentTime=0;
            //初始颜色：黑色
            this.node.parent.getComponentsInChildren(Main_page_AudioContoller)[i].node.getChildByName("Song_name").getComponent(Label).color=color(0,0,0,255);
            //胶片初始状态：rotating=false
            this.node.parent.getComponentsInChildren(Venyl_Rotate)[i]._rotating=false;


        }
        if(this._playing==false) {
            this.play();
            console.log('play');
            this._playing=true;
            //设置字体颜色
            this.node.getChildByName("Song_name").getComponent(Label).color=color(255,0,0,255);
            //设置胶片旋转状态
            this.node.getChildByName("venyl").getComponent(Venyl_Rotate)._rotating=true;
        }
        else {
            this.pause();
            console.log('pause');
            this._playing=false;
            //设置字体颜色
            this.node.getChildByName("Song_name").getComponent(Label).color=color(0,0,0,255);
            //设置胶片旋转状态
            this.node.getChildByName("venyl").getComponent(Venyl_Rotate)._rotating=false;
        }
    }
    play(){
        this._audioSource.play();
    }
    pause(){
        this._audioSource.pause();
        this._audioSource.currentTime=0;
    }
}

