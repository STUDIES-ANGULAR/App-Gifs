import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  //este error es nuevo de angular, y es que dice que no encuentra el elemento txtBuscar, 
  //este elemento va a existir en momento de ejecución ya que se encuenta en el .ts
  //se soluciona con el signo ! es decirle que sabemos que va a existir (relajate TypeScript jaja)
  //
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>; //agarra toda la caja de texto por #referencia y la manipulo a mi antojo
  //el HTMLInputElement me permite definirle el tipo al ElementRef

  //inyectamos el servicio a traves de su constructor
  constructor(private gifsService: GifsService) { }

  buscar() {
    
    const valor: string = this.txtBuscar.nativeElement.value;
    if(valor.trim().length===0){
      return;
    }

    console.log(valor);
    this.gifsService.buscarGifs(valor);
    //limpiamos el txtBuscar del input
    this.txtBuscar.nativeElement.value = '';
  }

}

