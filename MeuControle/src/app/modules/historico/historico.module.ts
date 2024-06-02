import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoricoComponent } from './pages/historico/historico.component';
import { SharedModule } from "../../shared/shared.module";
import { RouterModule } from "@angular/router";
import { DASHBOARD_ROUTES } from "../dashboard/dashboard.routing";
import { HISTORICO_ROUTES } from "./historico.routing";

@NgModule({
  declarations: [
    HistoricoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(HISTORICO_ROUTES),
    SharedModule,
  ]
})
export class HistoricoModule { }
