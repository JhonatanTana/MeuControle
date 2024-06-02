import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { CARDAPIO_ROUTES } from "./cardapio.routing";
import { CardapioComponent } from './pages/cardapio/cardapio.component';
import { AppModule } from "../../app.module";
import { SharedModule } from "../../shared/shared.module";



@NgModule({
  declarations: [
    CardapioComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CARDAPIO_ROUTES),
    SharedModule,
  ]
})
export class CardapioModule { }
