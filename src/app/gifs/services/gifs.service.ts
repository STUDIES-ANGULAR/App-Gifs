import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];


  get historial() {
    return [...this._historial];
  }

  buscarGifs (queryBusqueda: string){
    //agregamos el query de busqueda al inicio de nuestro array de historiales
    this._historial.unshift(queryBusqueda);

    console.log (this._historial);
  }
}
