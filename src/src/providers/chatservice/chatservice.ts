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
  messageId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  toUserId: string;
  time: number | string;
  message: string;
  status: string;
}

export class UserInfo {
  id: string;
  name?: string;
  avatar?: string;
}

export const userAvatar = '../../assets/imgs/chatbot.png';
export const toUserAvatar = '../../assets/imgs/logo.png';


@Injectable()
export class ChatserviceProvider {

  constructor(public http: HttpClient,private events:Events) {
    console.log('Hello ChatserviceProvider Provider');
  }
  mockNewMsg(msg) {
    const mockMsg: ChatMessage = {
      messageId: Date.now().toString(),
      userId: '210000198410281948',
      userName: 'Xyz',
      userAvatar: toUserAvatar,
      toUserId: '140000198202211138',
      time: Date.now(),
      message: msg.message,
      status: 'success'
    };

    setTimeout(() => {
      this.events.publish('chat:received', mockMsg, Date.now())
    }, Math.random() * 1800)
  }
  getMessageList(): Observable<ChatMessage[]> {
    const msgListUrl = 'http://www.mocky.io/v2/5d319b7033000068007ba2d0';
    return this.http.get<any>(msgListUrl)
    .pipe(map(response => response.array.map(msg => ({
      ...msg,
     userAvatar: msg.userAvatar === './assets/user.jpg' ? userAvatar : toUserAvatar
    }))));
  }

  sendMsg(msg: ChatMessage) {
    return new Promise(resolve => setTimeout(() => resolve(msg), Math.random() * 1000))
      .then(() => this.mockNewMsg(msg));
  }
  getUserInfo(): Promise<UserInfo> {
    const userInfo: UserInfo = {
      id: '140000198202211138',
      name: 'Pqr',
      avatar: userAvatar
    };
    return new Promise(resolve => resolve(userInfo));
  }
}
