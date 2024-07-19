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
import { InputSwitchModule } from "primeng/inputswitch";
import { CategoriaPageComponent } from './pages/categoria-page/categoria-page.component';
import { CategoriaTableComponent } from './components/categoria-table/categoria-table.component';
import { CategoriaFormComponent } from './components/categoria-form/categoria-form.component';
import { FormaPagamentoPageComponent } from './pages/forma-pagamento-page/forma-pagamento-page.component';
import { PagamentoTableComponent } from './components/pagamento-table/pagamento-table.component';
import { PagamentoFormComponent } from './components/pagamento-form/pagamento-form.component';

@NgModule({
  declarations: [
    ConfigPageComponent,
    UsuarioPageComponent,
    UsuarioFormComponent,
    UsuarioTableComponent,
    ResetSenhaFormComponent,
    CategoriaPageComponent,
    CategoriaTableComponent,
    CategoriaFormComponent,
    FormaPagamentoPageComponent,
    PagamentoTableComponent,
    PagamentoFormComponent
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
    InputSwitchModule,
  ],
  providers: [DialogService, ConfirmationService]
})
export class ConfigsModule { }
