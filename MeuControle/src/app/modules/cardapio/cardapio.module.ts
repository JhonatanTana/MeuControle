import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { CARDAPIO_ROUTES } from "./cardapio.routing";
import { CardapioComponent } from './pages/cardapio/cardapio.component';
import { SharedModule } from "../../shared/shared.module";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { TabelaProdutosComponent } from "./components/tabela-produtos/tabela-produtos.component";
import { AcoesComponent } from './components/acoes/acoes.component';

@NgModule({
  declarations: [
    CardapioComponent,
    TabelaProdutosComponent,
    AcoesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CARDAPIO_ROUTES),
    SharedModule,
    FaIconComponent,
  ]
})
export class CardapioModule { }
