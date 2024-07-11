import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { PEDIDOS_ROUTES } from "./pedidos.routing";
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { SharedModule } from "../../shared/shared.module";
import { PedidosTableComponent } from './components/pedidos-table/pedidos-table.component';
import { TableModule } from "primeng/table";
import { Button } from "primeng/button";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { DialogService } from "primeng/dynamicdialog";
import { ConfirmationService } from "primeng/api";
import { ProdutoFormComponent } from './components/produto-form/produto-form.component';
import { ProdutoListComponent } from './components/produto-list/produto-list.component';
import { ConcluiPedidoComponent } from './components/conclui-pedido/conclui-pedido.component';
import { DropdownModule } from "primeng/dropdown";
import { NovoPedidoFormComponent } from './components/novo-pedido-form/novo-pedido-form.component';


@NgModule({
  declarations: [
    PedidosComponent,
    PedidosTableComponent,
    ProdutoFormComponent,
    ProdutoListComponent,
    ConcluiPedidoComponent,
    NovoPedidoFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PEDIDOS_ROUTES),
    SharedModule,
    TableModule,
    Button,
    FormsModule,
    ConfirmDialogModule,
    DropdownModule,
    ReactiveFormsModule,
  ],
  providers: [DialogService, ConfirmationService],
})
export class PedidosModule { }
