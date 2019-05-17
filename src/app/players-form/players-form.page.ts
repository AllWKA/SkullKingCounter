import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-players-form',
  templateUrl: './players-form.page.html',
  styleUrls: ['./players-form.page.scss'],
})
export class PlayersFormPage implements OnInit {

  constructor(private storage: Storage) { }

  ngOnInit() {

    this.storage.get("numPlayers").then(num => {
      console.log(num);
    })
  }

}
