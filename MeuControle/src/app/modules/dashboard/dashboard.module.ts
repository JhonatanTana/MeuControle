import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DASHBOARD_ROUTES } from "./dashboard.routing";
import { RouterModule } from "@angular/router";
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SharedModule } from "../../shared/shared.module";


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(DASHBOARD_ROUTES),
    SharedModule,
  ],
})
export class DashboardModule { }
