import { MultimediaService } from './../../services/multimedia.service';
import { TracksModel } from '@core/models/tracks.models';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mediaplayer',
  templateUrl: './mediaplayer.component.html',
  styleUrls: ['./mediaplayer.component.css']
})

export class MediaplayerComponent implements OnInit, OnDestroy{

  listObservers$: Array<Subscription> = []

  constructor(private multimediaService: MultimediaService){}

  mockCover: TracksModel = {
    cover: 'https://phantom-marca.unidadeditorial.es/28c5699232b8df1ec8be1b23b70a86df/resize/1320/f/jpg/assets/multimedia/imagenes/2022/12/30/16723983861323.jpg',
    album: 'Drake',
    name: 'Goods plan',
    url: '',
    _id: 1
  }

  ngOnInit(): void {
    const observer1$: Subscription = this.multimediaService.callback.subscribe(
      (response: TracksModel) => {
        console.log('recibiendo cancion...', response)
        
      }
    )
    this.listObservers$ = [observer1$]
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach(u => u.unsubscribe()) // Desuscribir
    console.log('destruido')
  }
}
