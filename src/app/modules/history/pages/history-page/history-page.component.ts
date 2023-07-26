import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TracksModel } from '@core/models/tracks.models';
import { SearchService } from '@modules/history/services/search.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit{
  listResults$: Observable<any> = of([])

  constructor(
    private searchService: SearchService  
    ){}

  ngOnInit(): void {
    
  }

  receiveData(event: string): void{
    //Agarra el termino y solo se ejecuta cuando tiene 3 terminos
    console.log('Estoy en el padre ', event);
    this.listResults$ = this.searchService.searchTracks$(event)
  }
}
