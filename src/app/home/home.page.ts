import {Component} from '@angular/core'
import {IonicModule} from '@ionic/angular'
import {Router} from '@angular/router'
import {NgIf} from '@angular/common'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, NgIf],
})
export class HomePage {
  numPlayers = 2

  audio = new Audio()

  wrongNumPlayers = false

  constructor(private router: Router) {
  }

  async ngOnInit() {
    this.audio.src = "/assets/sounds/menu.mp3"

    this.audio.load()

    this.audio.play()
  }

  start() {
    if (this.numPlayers > 2 && this.numPlayers <= 6) {
      this.audio.pause()

      this.router.navigate(['player-form', this.numPlayers])
    } else {
      this.wrongNumPlayers = true
    }
  }

  updateNumPlayers($event: any) {
    this.numPlayers = $event.target.value
  }
}
