import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { NavController, ModalController, PopoverController } from 'ionic-angular';
import { ChatPage } from '../chat/chat';
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  toUser: { toUserId: string, toUserName: string };
  constructor(public navCtrl: NavController, public modalcontrl: ModalController, public popctrl: PopoverController) {

  }
//open ChatPage as popup
  openChatPopup() {
    let chatpopup = this.popctrl.create(ChatPage, {});
    chatpopup.present();
  }

 //open ChatPage from icon 
  openChatWindow() {
    this.navCtrl.push(ChatPage, this.toUser);
  }

}
