import { Component } from '@angular/core';
import { NavController,ModalController,PopoverController } from 'ionic-angular';
import { ChatPage } from '../chat/chat';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  toUser : {toUserId: string, toUserName: string};
  constructor(public navCtrl: NavController,public modalcontrl:ModalController,public popctrl:PopoverController) {
    this.toUser = {
      toUserId:'210000198410281948',
      toUserName:'User1'
    }

  }

openChatPopup()
{
let chatpopup=this.popctrl.create('PopupPage',{},{cssClass:'popupclass'});
chatpopup.present();
}







  openChatWindow() {
    this.navCtrl.push(ChatPage, this.toUser);
  }

}
