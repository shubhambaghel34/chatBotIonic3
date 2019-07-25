import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
/*
  Generated class for the ChatserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export class ChatMessage {
  // messageId: string;
   userId: string;
  // // userName: string;
  // // userAvatar: string;
   toUserId: string;
  // time: number | string;
  message: string;
  status: string;
}

export class UserInfo {
  id: string;
 

 
}

export const userAvatar = '../../assets/imgs/chatbot.png';
export const toUserAvatar = '../../assets/imgs/logo.png';


@Injectable()
export class ChatserviceProvider {
  objdata:any=[];

  constructor(public http: HttpClient,private events:Events) {
    console.log('Hello ChatserviceProvider ');
  }
  mockNewMsg(msg) {
    const mockMsg: ChatMessage = {
     // messageId: Date.now().toString(),
      userId: '210000198410281948',
      toUserId: '140000198202211138',
      message: msg.message,
      status: 'success'
    };

    setTimeout(() => {
      this.events.publish('chat:received', mockMsg, Date.now())
    }, Math.random() * 1800)
  }
  getMessageList() {
    const msgListUrl = 'http://172.30.24.54:8080/xiva';
    var promise = new Promise((resolve, reject) => {
      this.http.post(msgListUrl,{query:'hi'}).subscribe((response) => {
        resolve(response);
      //  console.log(response);
    });
    });
    return promise;
    
    }


  //   getUserInfo():Promise<UserInfo> {
  //     const userInfo: UserInfo = {
  //       id: '140000198202211138',
    
  //     };
  //     return new Promise(resolve => resolve(userInfo));
  //   }


  // }
  
  }





  // sendMsg(msg: ChatMessage) {
  //   return new Promise(resolve => setTimeout(() => resolve(msg), Math.random() * 1000))
  //     .then(() => this.mockNewMsg(msg));
  // }
  



