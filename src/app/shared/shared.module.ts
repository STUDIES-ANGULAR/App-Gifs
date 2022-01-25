import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [
    SidebarComponent
  ],
  exports:[//para poderlo usar en otros modulos
    SidebarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
