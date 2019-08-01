import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events, Content } from 'ionic-angular';
import { ChatserviceProvider, ChatMessage, UserInfo } from '../../providers/chatservice/chatservice';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

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
  displayData: any = [];
  @ViewChild(Content) content: Content;
  @ViewChild('Msg_input') messageInput: ElementRef;
  msgList: ChatMessage[] = [];
  user: UserInfo;
  toUser: UserInfo;
  editorMsg = '';
  msg: any[] = [];
  messagesRes: any = {};
 
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private chatService: ChatserviceProvider, private events: Events,
    public http: HttpClient) {
    this.toUser = {
      id: navParams.get('toUserId'),
      name:navParams.get('toUsername')
    };
    this.chatService.getUserInfo()
    .then((res) => {
     this.user=res;
      console.log('getuserinfo....');
    });
  

  }
  ionViewWillLeave() {
    this.events.unsubscribe('chat:received');
  }

  ionViewDidEnter() {

  }



  sendMsg() {
    if (!this.editorMsg.trim()) return;
    let newMsg: ChatMessage = {
      message: this.editorMsg,
      userName:'me', 
         
    };
    this.pushMsg(newMsg, 'touser');
    this.editorMsg = '';
    this.chatService.sendMsg(newMsg)
      .then(response => {
        this.messagesRes = response;
        this.pushMsg(this.messagesRes, 'fromuser');
        
     
      })
  }
  pushMsg(msg: ChatMessage, type: string) {
  
    this.toUser.name='user';
    msg['type'] = type;
    this.msgList.push(msg);
    console.log(this.msgList);
    this.scrollToBottom();
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

  }


 

}
