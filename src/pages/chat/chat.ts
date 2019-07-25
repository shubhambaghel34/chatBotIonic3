import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events, Content } from 'ionic-angular';
import {ChatserviceProvider,ChatMessage,UserInfo} from '../../providers/chatservice/chatservice';
import{HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})

export class ChatPage {
  displayData:any=[];
  @ViewChild(Content) content: Content;
  @ViewChild('Msg_input') messageInput: ElementRef;
  msgList: ChatMessage[] = [];
  user: UserInfo;
  toUser: UserInfo;
  editorMsg = '';
  msg:any[] =[];

  constructor(public navCtrl: NavController, public navParams: NavParams,  private chatService: ChatserviceProvider, private events:Events,public http:HttpClient) 
  {
    this.toUser = {
      id: navParams.get('toUserId'),
     
    };
    // this.chatService.getUserInfo()
    // .then((res) => {
    //   this.user = res
    // });
  }
  ionViewWillLeave() {
    this.events.unsubscribe('chat:received');
  }

  ionViewDidEnter() {
    //get message list
    this.getMessageList();

    // Subscribe to received  new message events
    this.events.subscribe('chat:received', msg => {
      this.pushMsg(msg);
    })
  }
  messageRcv: any;
  getMessageList() {
    this.chatService.getMessageList().then(res =>{
      this.messageRcv = res;
      this.pushMsg(this.messageRcv);
    })
    // Get mock message list
    // return this.chatService
    //   .getMessageList()
    //   .subscribe(res => {

    //     this.msgList = res;
    //     this.scrollToBottom();
    //   });
  }
  
  sendMsg() {
    if (!this.editorMsg.trim()) return;

    // Mock message
    //const id = Date.now().toString();
    let newMsg: ChatMessage = {
      // messageId: Date.now().toString(),
       userId: this.user.id,
      // // userName: this.user.name,
      // userAvatar: this.user.avatar,
       toUserId: this.toUser.id,
      // time: Date.now(),
      message: this.editorMsg,
      status: 'pending'
    };

    this.pushMsg(newMsg);
    this.editorMsg = '';

    
    // this.chatService.sendMsg(newMsg)
    //   .then(() => {
    //     let index = this.getMsgIndexById(id);
    //     if (index !== -1) {
    //       this.msgList[index].status = 'success';
    //     }
    //   })
  }


  pushMsg(msg: ChatMessage) {
    // const userId = this.user.id,
    //   toUserId = this.toUser.id;
    
    // if (msg.userId === userId && msg.toUserId === toUserId) {
      //  this.msgList.push(msg);
    // } else if (msg.toUserId === userId && msg.userId === toUserId) {
    //   this.msgList.push(msg);
    // }
    this.msgList.push(msg);
    console.log(this.msgList);
    this.scrollToBottom();
  }

  getMsgIndexById(id: string) {
    return this.msgList.findIndex(e => e.userId === id)
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400)
  }
  private focus() {
    if (this.messageInput && this.messageInput.nativeElement) {
      this.messageInput.nativeElement.focus();
    }
  }

  onFocus() {
   
    this.content.resize();
    this.scrollToBottom();
  }

  private setTextareaScroll() {
    const textarea = this.messageInput.nativeElement;
    textarea.scrollTop = textarea.scrollHeight;
  }

  

  ionViewDidLoad() {
//   this.http.post('http://172.30.24.54:8080/xiva',{query:'hi'}).subscribe((response) => {
  
//     console.log(response);
// });
  }

}
