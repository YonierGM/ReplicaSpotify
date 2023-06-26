import { MultimediaService } from '@shared/services/multimedia.service';
import { TracksModel } from './../../../core/models/tracks.models';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-player',
  templateUrl: './card-player.component.html',
  styleUrls: ['./card-player.component.css']
})
export class CardPlayerComponent implements OnInit{
  @Input() mode: 'small' | 'big' = 'small'
  @Input() track: TracksModel = { _id: 0, name: '', album: '', url: '', cover: '' };

  constructor(private multimediaService: MultimediaService){}

  ngOnInit(): void {
   
  }

  sendPlay(track: TracksModel):void{
    console.log('enviando cancion al reproductor.....', track)
    this.multimediaService.callback.emit(track)
  }
}
