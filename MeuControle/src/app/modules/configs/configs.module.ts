import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService } from "primeng/dynamicdialog";
import { ConfirmationService } from "primeng/api";
import { RouterModule } from "@angular/router";
import { CONFIGS_ROUTES } from "./configs.routing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../shared/shared.module";
import { TableModule } from "primeng/table";
import { Button } from "primeng/button";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { DropdownModule } from "primeng/dropdown";
import { ConfigPageComponent } from './pages/config-page/config-page.component';
import { UsuarioPageComponent } from './pages/usuario-page/usuario-page.component';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';
import { UsuarioTableComponent } from './components/usuario-table/usuario-table.component';
import { InputTextModule } from "primeng/inputtext";
import { ResetSenhaFormComponent } from './components/reset-senha-form/reset-senha-form.component';

@NgModule({
  declarations: [
    ConfigPageComponent,
    UsuarioPageComponent,
    UsuarioFormComponent,
    UsuarioTableComponent,
    ResetSenhaFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CONFIGS_ROUTES),
    SharedModule,
    TableModule,
    Button,
    FormsModule,
    ConfirmDialogModule,
    DropdownModule,
    ReactiveFormsModule,
    InputTextModule,
  ],
  providers: [DialogService, ConfirmationService]
})
export class ConfigsModule { }
