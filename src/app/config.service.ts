import {Injectable} from '@angular/core';
import {Player} from "../global.types";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  numPlayers = 2

  players: Array<Player> = []

  constructor() {
  }

  reset(){
    this.numPlayers = 2

    this.players = []
  }
}
