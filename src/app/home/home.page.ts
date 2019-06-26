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
  audio = new Audio();
  constructor(private navCtrl: NavController, private storage: Storage) { }
  ngOnInit() {
    this.audio.src = "../assets/sounds/menu.mp3";
    this.audio.load();
    this.audio.play();
  }
  async start() {
    if (parseInt(this.input.value) > 0 && parseInt(this.input.value) <= 6) {
      await this.storage.set("numPlayers", this.input.value);
      this.audio.pause();
      this.navCtrl.navigateRoot('players-form');
    } else {
      alert("number not valid")
    }
  }

}
