import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TracksModel } from '@core/models/tracks.models';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private readonly URL = environment.api;
  constructor(private httpCliente: HttpClient) { 

  }

  private skipById(listTracks: TracksModel[], id: number):Promise<TracksModel[]> {
    return new Promise((resolve, reject) => {
      const listTmp = listTracks.filter( a => a._id != id) 
      resolve(listTmp)
    }) 
  }

  getAllTracks$():Observable<any>{
    return this.httpCliente.get(`${this.URL}/tracks`)
    .pipe(
      map(({data}: any) => {
        return data
      })
    )
  }

    //Devolver todas las canciones 

  getAllRandom$():Observable<any>{
    return this.httpCliente.get(`${this.URL}/tracks`)
    .pipe(
      tap(data => console.log('dataV1', data)),
      mergeMap(({ data }: any) => this.skipById(data, 1)),
      tap(data => console.log('dataV2', data)),
      catchError((err) => {
        const { status, statusText } = err
        console.log('Algo falló ', [status, statusText])
        return of([])
      })
      )
  }
}
