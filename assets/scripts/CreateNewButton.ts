import { 
    _decorator, 
    Component, 
    Node, 
    Button, 
    ScrollView, 
    Sprite, 
    instantiate,
    Label,
    Texture2D,
    SpriteFrame,
    resources,
    director, 
    UITransform,
    AudioClip, 
    AudioSource } from 'cc';
import { Main_page_AudioContoller } from './Main_page_AudioContoller';
const { ccclass, property } = _decorator;

@ccclass('CreateNewButton')
export class CreateNewButton extends Component {
    @property(Button)
    public _fathernode:Button=null!;
    public _button_num:number=0!;
    public _original_y:number=null!;
    public _song_name:string=null!;
    public _audioClip:AudioClip=null!;
    @property
    songs_num:number=0;
    onLoad(){
            //
        const fathernode=this.node.getComponent(Button)!;
        this._fathernode=fathernode;
        this._original_y=this._fathernode.node.getPosition().y;
            //设置content长度
        /* const uiTransform = this.node.parent.getComponent(UITransform);
        const contentsize_width=this.node.parent.getComponent(UITransform).width;
        const contentsize_height=this.node.getComponent(UITransform).height+60*(this.songs_num+1); //60=40(button)+20(gap)
        uiTransform.setContentSize(contentsize_width, contentsize_height);
        uiTransform.setAnchorPoint(0.5, 1);
        
        console.log(contentsize_width);
        console.log(contentsize_height); */
        
            //创建歌曲入口按钮
        resources.loadDir("songs",AudioClip,(err, audios:AudioClip[])=>{

            if(err){
                console.warn("cannot load songs");
                return;
            }
            console.log("LOAD_SONGDIR");
            console.log(audios.length);
                //设置按钮音频和标签
            this.node.getComponent(Main_page_AudioContoller)._audioSource.clip=audios[0];
            this.node.getChildByName("Song_name").getComponent(Label).string=audios[0].name;
                //设置content长度
            const uiTransform = this.node.parent.getComponent(UITransform);
            const contentsize_width=this.node.parent.getComponent(UITransform).width;
            const contentsize_height=this.node.getComponent(UITransform).height+60*(Math.min(this.songs_num,audios.length)-1); //60=40(button)+20(gap)
            uiTransform.setContentSize(contentsize_width, contentsize_height);
            uiTransform.setAnchorPoint(0.5, 1);
            console.log(contentsize_width);
            console.log(contentsize_height);

            //i从1开始，初始按钮占用第一个audio
            for(let i=1;i<Math.min(this.songs_num,audios.length);i++){
                const song=audios[i];
                this._song_name=song!.name;
                this._audioClip=audios[i];
                console.log(song.name);
                this.Create_New_Button();
            }
            
        });
        
        
    }
    Create_New_Button(){
        
        this._button_num+=1;
        console.log(this._fathernode.node.getPosition().x);
        console.log(this._fathernode.node.getPosition().y);
        console.log(this._fathernode.node.getPosition().z);

        var button_node=instantiate(this._fathernode.node);
            //更改各个button的label标签
        button_node.getChildByName("Song_name").getComponent(Label).string=this._song_name;
            //删除新button的createnewbutton组件
        button_node.getComponent(CreateNewButton).destroy();
            //设置button位置
        button_node.setPosition(this._fathernode.node.getPosition().x,this._original_y-60*this._button_num,0);
            //加载音乐
        button_node.getComponent(Main_page_AudioContoller)._audioSource.clip=this._audioClip;
    
        this._fathernode.node.parent.addChild(button_node);
    }
}


