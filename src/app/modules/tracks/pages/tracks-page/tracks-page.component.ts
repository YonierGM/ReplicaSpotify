import { TracksModel } from './../../../../core/models/tracks.models';
import { TrackService } from './../../services/track.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent implements OnInit, OnDestroy{
  tracksTrending:Array<TracksModel> = []
  tracksRandom:Array<TracksModel> = []

  listObservers$:Array<Subscription> = []

  constructor(private trackservice:TrackService){}

  ngOnInit(): void {
    this.loadDataAll()
    this.loadDataRandom()
  }

  loadDataAll(){
    this.trackservice.getAllTracks$()
    .subscribe((response: TracksModel[]) => {
      this.tracksTrending = response
    })
  }

  loadDataRandom(){
    this.trackservice.getAllRandom$()
    .subscribe((response: TracksModel[]) => {
      this.tracksRandom = response
    })
  }


  ngOnDestroy(): void {

  }
}
