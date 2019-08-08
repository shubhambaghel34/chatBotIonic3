import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events, Content } from 'ionic-angular';
import { Hotelsdetails } from '../../interface/HotelsDetails';
import { ChatserviceProvider, ChatMessage, UserInfo } from '../../providers/chatservice/chatservice';

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
    private chatService: ChatserviceProvider, private events: Events) {
    this.toUser = {
      id: navParams.get('toUserId'),
      name: navParams.get('toUsername')
    };
    this.chatService.getUserInfo()
      .then((res) => {
        this.user = res;
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
      userName: 'me',
      useravatar:''
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
    msg['type'] = type;
    if (type === 'fromuser') msg.userName = 'bot';
    else if (type === 'touser') msg.userName = 'me';
 if(type === 'fromuser') msg.useravatar='../../assets/imgs/chatbot.png';
 else if(type =='touser')msg.useravatar='../../assets/imgs/chatbot.jpg';
    this.msgList.push(msg);
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
  public data = {
    startDate: '2019-08-10',
    endDate: '2019-08-11',
    hotelMnemonics: ['ATLBH'],
  }
  ionViewDidLoad() {
    this.chatService.getHotels(this.data).then(response =>{
      console.log(response);
      console.log('gethotels()...')
    })
    setTimeout(() => {
      this.messageInput.nativeElement.focus();

    }, 1000
    );
    console.log('Focuss evnt fired...');
  }




}
