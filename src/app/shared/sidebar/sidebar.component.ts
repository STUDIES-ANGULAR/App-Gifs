import { Component, NgModule } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent{
 
  get historial (): string []{
    return this.gifsService.historial;
  }

  buscar(queryOFSidebar:string){
    this.gifsService.buscarGifs(queryOFSidebar);

  }
  
  constructor( private gifsService: GifsService){}
  //let buscados: string [] = [];

 

}

