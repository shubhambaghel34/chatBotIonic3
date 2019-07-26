import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events, Content } from 'ionic-angular';
import {ChatserviceProvider,ChatMessage,UserInfo} from '../../providers/chatservice/chatservice';
import{HttpClient, HttpParams } from '@angular/common/http';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, 
     private chatService: ChatserviceProvider, private events:Events,
     public http:HttpClient) 
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
    // //get message list
    // this.getMessageList();

    // // Subscribe to received  new message events
    // this.events.subscribe('chat:received', msg => {
    //   this.pushMsg(msg);
    // })
  }
  messageRcv: any;
  // getMessageList() {
  //   this.chatService.getMessageList().then(res =>{
  //     this.messageRcv = res;
  //     this.pushMsg(this.messageRcv);
  //   })
    // Get mock message list
    // return this.chatService
    //   .getMessageList()
    //   .subscribe(res => {

    //     this.msgList = res;
    //     this.scrollToBottom();
    //   });
  // }
  messagesRes:any = {};
  sendMsg() {
    if (!this.editorMsg.trim()) return;

    // Mock message
    //const id = Date.now().toString();
    let newMsg: ChatMessage = {
      //  userId: this.user.id,
      //  toUserId: this.toUser.id,
       message: this.editorMsg,
    };

    this.pushMsg(newMsg, 'touser');
    this.editorMsg = '';

    
    this.chatService.sendMsg(newMsg)
      .then(response => {
        this.messagesRes = response;
        this.pushMsg(this.messagesRes, 'fromuser')
      })
  }


  pushMsg(msg: ChatMessage, type: string) {
    msg['type'] = type;
    this.msgList.push(msg);
    console.log(this.msgList);
    this.scrollToBottom();
  }

  // getMsgIndexById(id: string) {
  //   return this.msgList.findIndex(e => e.userId === id)
  // }

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
//     let params = new HttpParams()
//     params.append("query", "hi")
//     this.http.post('http://172.30.24.54:8080/xiva', {query:"hi"}).subscribe((response) => {
//  console.log(response);
// });
  }

}
