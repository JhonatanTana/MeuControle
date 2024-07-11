import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SharedModule } from "../../shared/shared.module";
import { RouterModule } from "@angular/router";
import { DASHBOARD_ROUTES } from "./dashboard.routing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ChartModule } from "primeng/chart";

@NgModule({
  declarations: [
    DashboardComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(DASHBOARD_ROUTES),
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        ChartModule,
    ]
})
export class DashboardModule { }
