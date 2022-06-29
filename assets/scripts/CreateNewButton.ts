import { _decorator, Component, Node, Button, ScrollView, Sprite, instantiate, Label,Texture2D,SpriteFrame,resources,director, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CreateNewButton')
export class CreateNewButton extends Component {
    @property(Button)
    public _fathernode:Button=null!;
    public _button_num:number=0!;
    public _original_y:number=null!;
    public _stopper:number=0;
    @property
    songs_num:number=0;
    onLoad(){
            //根据屏幕分辨率修改按钮长宽
        //    var b = director.getWinSizeInPixels()
        const fathernode=this.node.getComponent(Button)!;
        /* assert(fathernode); */
        this._fathernode=fathernode;
        this._original_y=this._fathernode.node.getPosition().y;
            //设置content长度
        const uiTransform = this.node.parent.getComponent(UITransform);
        const contentsize_width=this.node.parent.getComponent(UITransform).width;
        const contentsize_height=this.node.getComponent(UITransform).height+60*(this.songs_num+1); //60=40(button)+20(gap)
        uiTransform.setContentSize(contentsize_width, contentsize_height);
        uiTransform.setAnchorPoint(0.5, 1);
        
        console.log(contentsize_width);
        console.log(contentsize_height);
        //this.node.parent.getComponent(UITransform).setContentSize(contentsize_width,contentsize_height-10*this._original_y);

        /* this.node.on('touchend',this.Create_New_Button,this); */
            //创建歌曲入口按钮
        for (this._stopper=0;this._stopper<=this.songs_num;this._stopper++){
            this.Create_New_Button();
        }
    }
    Create_New_Button(){
        /* const fathernode=this.node.getComponent(Button);
        this._fathernode=fathernode; */
        this._button_num+=1;
        console.log(this._fathernode.node.getPosition().x);
        console.log(this._fathernode.node.getPosition().y);
        console.log(this._fathernode.node.getPosition().z);
        /* var button=new Button;
        var button_node= new Node();
        var sprite=button_node.addComponent(Sprite); */
        var button_node=instantiate(this._fathernode.node);
            //更改各个button的label标签
        button_node.getChildByName("Song_name").getComponent(Label).string="button"+this._stopper.toString();
        button_node.getComponent(CreateNewButton).destroy();
        //sprite.spriteFrame=this._fathernode.normalSprite;
        button_node.setPosition(this._fathernode.node.getPosition().x,this._original_y-60*this._button_num,0);
            //todo:加载音频图片到按钮上
        
        /* resources.load("assets/11/spriteFrame", SpriteFrame, (err, spriteFrame) => {
            button_node.getComponent(Sprite).spriteFrame = spriteFrame;
        });
        resources.load("assets/11/texture",Texture2D,(err,texture)=>{
            const spriteFrame=new SpriteFrame();
            spriteFrame.texture=texture;
            button_node.getComponent(Sprite).spriteFrame=spriteFrame;
            
        }); */
        
        this._fathernode.node.parent.addChild(button_node);
    }
}


