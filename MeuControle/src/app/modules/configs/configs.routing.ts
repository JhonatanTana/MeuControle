import { Routes } from "@angular/router";
import { ConfigPageComponent } from "./pages/config-page/config-page.component";
import { UsuarioPageComponent } from "./pages/usuario-page/usuario-page.component";

export const CONFIGS_ROUTES: Routes = [
  { path: "", component: ConfigPageComponent },
  { path: 'usuarios', component: UsuarioPageComponent }
]
