import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChatPage } from '../chat/chat';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  toUser : {toUserId: string, toUserName: string};
  constructor(public navCtrl: NavController) {
    this.toUser = {
      toUserId:'210000198410281948',
      toUserName:'User1'
    }
  }
  openChat() {
    this.navCtrl.push(ChatPage, this.toUser);
  }

}
