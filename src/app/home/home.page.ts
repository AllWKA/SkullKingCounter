import {Component} from '@angular/core'
import {IonicModule} from '@ionic/angular'
import {Router} from '@angular/router'
import {NgIf} from '@angular/common'
import {ConfigService} from "../config.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, NgIf],
})
export class HomePage {
  numPlayers = 2

  wrongNumPlayers = false

  constructor(private router: Router, private config: ConfigService) {
  }

  start() {
    if (this.numPlayers >= 2 && this.numPlayers <= 6) {
      this.config.numPlayers = this.numPlayers

      this.router.navigate(['player-form'])
    } else {
      this.wrongNumPlayers = true
    }
  }

  updateNumPlayers($event: any) {
    this.numPlayers = $event.target.value
  }
}
