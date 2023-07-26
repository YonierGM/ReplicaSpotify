import { MultimediaService } from './../../services/multimedia.service';
import { TracksModel } from '@core/models/tracks.models';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mediaplayer',
  templateUrl: './mediaplayer.component.html',
  styleUrls: ['./mediaplayer.component.css']
})

export class MediaplayerComponent implements OnInit, OnDestroy{
  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('')
  listObservers$: Array<Subscription> = []
  state: string = 'paused'
  
  constructor(public multimediaService: MultimediaService){}

  ngOnInit(): void {
    const observer1$ = this.multimediaService.playerStatus$
    .subscribe(status => this.state = status)

    this.listObservers$ = [observer1$]
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach(u => u.unsubscribe()) // Desuscribir
    console.log('destruido')
  }

  handlePosition(event: MouseEvent): void {
    const elNative: HTMLElement = this.progressBar.nativeElement
    const { clientX } = event
    const { x, width } = elNative.getBoundingClientRect()
    const clickX = clientX - x //Identificamos el inicio de la barra de progreso
    const percentageFromX = (clickX * 100) / width // Sacamos en valor porcentual la ubcacion del click a lo largo de la barra de progreso
    console.log(`Click(X): ${percentageFromX}`)
    this.multimediaService.seekAudio(percentageFromX)
  }
}
