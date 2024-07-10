import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoricoComponent } from './pages/historico/historico.component';
import { SharedModule } from "../../shared/shared.module";
import { RouterModule } from "@angular/router";
import { HISTORICO_ROUTES } from "./historico.routing";
import { DialogService } from "primeng/dynamicdialog";
import { ConfirmationService } from "primeng/api";
import { TableModule } from "primeng/table";
import { Button } from "primeng/button";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { DropdownModule } from "primeng/dropdown";
import { HistoricoListComponent } from "./components/historico-list/historico-list.component";
import { HistoricoTableComponent } from "./components/historico-table/historico-table.component";

@NgModule({
  declarations: [
    HistoricoComponent,
    HistoricoListComponent,
    HistoricoTableComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(HISTORICO_ROUTES),
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
export class HistoricoModule { }
