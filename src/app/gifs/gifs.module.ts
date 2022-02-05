import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GifsPageComponent } from './gifs-page/gifs-page.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { ResultadosComponent } from './resultados/resultados.component';



@NgModule({
  declarations: [
    GifsPageComponent,
      BusquedaComponent,
      ResultadosComponent
  ],
  exports:[ //solo exportamos el GifsPageComponent ya que el contiene los demas componentes
    GifsPageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GifsModule { }
