import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];

  private apiKey: string = 'MKMQbJfpEAupRowipGUqnVFicN1Q1yDd';

  public resultados : Gif [] =[]; 

  get historial() {
    return [...this._historial]; // [...] rompemos la relacion con el arreglo original
  }

  constructor(private http: HttpClient) { }

  buscarGifs(queryBusqueda: string = '') {
    //quitamos espacios y pasamos a minisculas antes de almacenar
    queryBusqueda = queryBusqueda.trim().toLowerCase();
    //agregamos el query de busqueda al inicio de nuestro array de historiales
    // y miramos si no esta incluido en la lista
    if (!this._historial.includes(queryBusqueda)) {
      this._historial.unshift(queryBusqueda);
    }
    if (this._historial.length > 9) {
      this._historial = this._historial.slice(0, 10); //.splice corta el arreglo 
    }

    // fetch('https://api.giphy.com/v1/gifs/search?api_key=MKMQbJfpEAupRowipGUqnVFicN1Q1yDd&q=dragon ball&limit=10')
    // .then(resp=>{
    //   resp.json().then(data => {console.log(data)})
    // })
    // console.log(this._historial);

    //Al trabajar con Http hacemos uso de los observable y no de promesas como lo es con fetch
    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=MKMQbJfpEAupRowipGUqnVFicN1Q1yDd&q=${queryBusqueda} ball&limit=10`)
      .subscribe((resp) => {
        console.log(resp.data);
        this.resultados = resp.data;
      });

    //el suscribe se ejecuta cuando ya tenemos una respuesta de la peticion

  }
}
