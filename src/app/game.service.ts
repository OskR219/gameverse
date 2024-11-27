import { inject, Injectable } from '@angular/core';
import {
  Database,
  onDisconnect,
  onValue,
  ref,
  set,
} from '@angular/fire/database';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private database = inject(Database);

  public createRoom() {
    const room = uuidv4();
    const roomRef = ref(this.database, `rooms/${room}`);
    set(roomRef, {
      currentGame: 'square-sort-race',
    });

    const playerRef = ref(this.database, `rooms/${room}/players/Quvelito1`);
    set(playerRef, {
      score: 0,
    });

    

    onDisconnect(roomRef).remove().then();

    onValue(roomRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
    });
  }

  public joinRoom(room: string) {
    const playerRef = ref(this.database, `rooms/${room}/players/Quvelito2`);
    set(playerRef, {
      score: 0,
    });

    onDisconnect(playerRef).remove().then();
  }
}
