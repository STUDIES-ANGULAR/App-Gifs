import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];

  private apiKey: string = 'MKMQbJfpEAupRowipGUqnVFicN1Q1yDd';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';

  public resultados : Gif [] =[]; 

  get historial() {
    return [...this._historial]; // [...] rompemos la relacion con el arreglo original
  }

  //los constructores de los services solo se ejecutaran una sola vez en toda la app
  constructor(private http: HttpClient) { 
    //sacamos el historial del localStorage si es vacio, pasamos un []
    this._historial = JSON.parse(localStorage.getItem('historial')!)|| [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
    // if(localStorage.getItem('historial')){
    //   this._historial = JSON.parse(localStorage.getItem('historial')! );
    // }

  }

  buscarGifs(queryBusqueda: string = '') {
    //quitamos espacios y pasamos a minisculas antes de almacenar
    queryBusqueda = queryBusqueda.trim().toLowerCase();
    //agregamos el query de busqueda al inicio de nuestro array de historiales
    // y miramos si no esta incluido en la lista
    if (!this._historial.includes(queryBusqueda)) {
      this._historial.unshift(queryBusqueda);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
    if (this._historial.length > 9) {
      this._historial = this._historial.slice(0, 10); //.splice corta el arreglo 

      
    }

    // fetch('https://api.giphy.com/v1/gifs/search?api_key=MKMQbJfpEAupRowipGUqnVFicN1Q1yDd&q=dragon ball&limit=10')
    // .then(resp=>{
    //   resp.json().then(data => {console.log(data)})
    // })
    // console.log(this._historial);
    const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', '10')
          .set('q', queryBusqueda);
    
    console.log(params);

    //Al trabajar con Http hacemos uso de los observable y no de promesas como lo es con fetch con .then o Axios
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params: params})
      .subscribe((resp) => {
        console.log(resp.data);
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });

    //el suscribe se ejecuta cuando ya tenemos una respuesta de la peticion

  }
}
