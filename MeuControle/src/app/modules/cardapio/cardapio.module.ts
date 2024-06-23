import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { CARDAPIO_ROUTES } from "./cardapio.routing";
import { CardapioComponent } from './pages/cardapio/cardapio.component';
import { SharedModule } from "../../shared/shared.module";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { TabelaProdutosComponent } from "./components/tabela-produtos/tabela-produtos.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ConfirmationService, PrimeTemplate } from "primeng/api";
import { Ripple } from "primeng/ripple";
import { TooltipModule } from "primeng/tooltip";
import { ProdutoComponent } from './components/produto/produto.component';
import { Button, ButtonDirective } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { InputSwitchModule } from "primeng/inputswitch";
import { CategoriaComponent } from './components/categoria/categoria.component';
import { DialogService, DynamicDialogModule } from "primeng/dynamicdialog";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { CardModule } from "primeng/card";

@NgModule({
  declarations: [
    CardapioComponent,
    TabelaProdutosComponent,
    ProdutoComponent,
    CategoriaComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(CARDAPIO_ROUTES),
        SharedModule,
        FaIconComponent,
        FormsModule,
        ReactiveFormsModule,
        PrimeTemplate,
        Ripple,
        TooltipModule,
        Button,
        DialogModule,
        ButtonDirective,
        InputSwitchModule,
        ConfirmDialogModule,
        DynamicDialogModule,
        CardModule,
    ],
  providers: [DialogService, ConfirmationService],
})
export class CardapioModule { }
