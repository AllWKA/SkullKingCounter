import { Component } from '@angular/core';
import { IonSlides, IonSlide, IonInput, NavController } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild(IonInput) input: IonInput;

  constructor(private navCtrl: NavController, private storage: Storage) { }

  start() {
    this.storage.set("numPlayers", this.input.value);
    this.navCtrl.navigateRoot('players-form');
  }

}
