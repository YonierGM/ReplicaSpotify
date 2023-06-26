import { TracksModel } from '@core/models/tracks.models';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-generic',
  templateUrl: './section-generic.component.html',
  styleUrls: ['./section-generic.component.css']
})
export class SectionGenericComponent implements OnInit {
  @Input() title:string =''
  @Input() mode: 'small' | 'big' = 'big' // Solo recibe dos valores small o big, se inicializa en big 
  @Input() dataTracks: Array<TracksModel> = []

  constructor() {}
  
  ngOnInit(): void {
    
  }
}
