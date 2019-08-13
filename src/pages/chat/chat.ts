import { Weather, Responsedto } from './../../interface/weather';
import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events, Content } from 'ionic-angular';
import { Hotelsdetails } from '../../interface/HotelsDetails';
import { ChatserviceProvider, ChatMessage, UserInfo } from '../../providers/chatservice/chatservice';
import { Observable } from 'rxjs/Observable';
//import {HttpClient} from '@angular/common/http'
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
  questions$: Observable<Hotelsdetails[]>;
  totalQuestions: any =[];
  displayData: any = [];
  @ViewChild(Content) content: Content;
  @ViewChild('Msg_input') messageInput: ElementRef;
  msgList: ChatMessage[] = [];
  user: UserInfo;
  toUser: UserInfo;
  editorMsg = '';
  hotelInfo: any;
  jsdata:any;
  
  // label:any='Hotels';
  msg: any[] = [];
  messagesRes: any = {};
  arr:any =[];
  varb: any[] = [];
  public items: any
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private chatService: ChatserviceProvider, private events: Events) {
    this.toUser = {
      id: navParams.get('toUserId'),
      name: navParams.get('toUsername')
    };
    this.chatService.getUserInfo()
      .then((res) => {
        this.user = res;

      });


  }
  ionViewWillLeave() {
    this.events.unsubscribe('chat:received');
  }

  ionViewDidEnter() {

  }


  ionViewWillEnter(){
   
  }
  sendMsg() {
    if (!this.editorMsg.trim()) return;
    let newMsg: ChatMessage = {
      message: this.editorMsg,
      userName: 'me',
      useravatar: '',
    };
    this.pushMsg(newMsg, 'touser');
    this.editorMsg = '';
    this.chatService.sendMsg(newMsg)
      .then(response => {
        this.messagesRes = response;
        if (typeof this.messagesRes.message === 'string') {
          console.log('String');
          this.messagesRes['cardView'] = false;
        } else {
          console.log('notString');
          this.messagesRes['cardView'] = true;
          console.log(this.messagesRes);
        }

        this.pushMsg(this.messagesRes, 'fromuser');
      })
  }
  // cardView: boolean = false;
  pushMsg(msg: ChatMessage, type: string) {
    msg['type'] = type;
    if (type === 'fromuser') msg.userName = 'bot';
    else if (type === 'touser') msg.userName = 'me';
    if (type === 'fromuser') msg.useravatar = '../../assets/imgs/chatbot.png';
    else if (type == 'touser') msg.useravatar = '../../assets/imgs/chatbot.jpg';
    // if (msg.cardview) this.cardView = true;
    // else this.cardView = false;
    this.msgList.push(msg);
    console.log(this.msgList);
    this.scrollToBottom();
  }
  scrollToBottom() {
    setTimeout(() => {
      window.scrollTo(300, 500);
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
      this.chatService.getData().subscribe(res =>{
        console.log(res);
      
        this.hotelInfo= res;
        this.jsdata= this.hotelInfo.responsedto.result;
        
        console.log(this.hotelInfo.responsedto.result[0]);
        
       //this.msgList.push(res);
      })
    console.log('chatservice...');
    this.chatService.getHotels(this.data).then(response => {
     // console.log(response);
    //  this.arr = response;

      
      //console.log(this.arr);
      // this.msgList.push(this.arr);

    })

    // this.getcardData(this.varb).subscribe(res =>{
    //   console.log(res);
    //   this.items=res;
    // });
    setTimeout(() => {
      this.messageInput.nativeElement.focus();

    }, 1000
    );

  }


  //url='https://jsonplaceholder.typicode.com/posts'
  // getcardData(postobject: any): Observable<Hotelsdetails[]>{
  //  return this.http.post<Hotelsdetails[]>(this.url,postobject,{}).map(response =>{  
  //    return response;  
  //  })
  //   }



}
