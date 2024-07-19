import { Routes } from "@angular/router";
import { ConfigPageComponent } from "./pages/config-page/config-page.component";
import { UsuarioPageComponent } from "./pages/usuario-page/usuario-page.component";
import { CategoriaPageComponent } from "./pages/categoria-page/categoria-page.component";
import { FormaPagamentoPageComponent } from "./pages/forma-pagamento-page/forma-pagamento-page.component";

export const CONFIGS_ROUTES: Routes = [
  { path: "", component: ConfigPageComponent },
  { path: 'usuarios', component: UsuarioPageComponent },
  { path: 'categorias', component: CategoriaPageComponent },
  { path: 'formapagamento', component: FormaPagamentoPageComponent }
]
