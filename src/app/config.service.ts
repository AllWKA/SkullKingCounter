import {Injectable} from '@angular/core';
import {Player} from "../global.types";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  numPlayers = 32

  players: Array<Player> = []

  constructor() {
  }
}
