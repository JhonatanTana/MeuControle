import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { PEDIDOS_ROUTES } from "./pedidos.routing";
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  declarations: [
    PedidosComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PEDIDOS_ROUTES),
    SharedModule,
  ]
})
export class PedidosModule { }
