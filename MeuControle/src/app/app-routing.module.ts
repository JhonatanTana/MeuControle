import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  { path: "dashboard", loadChildren: () => import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule)},
  { path: "pedidos", loadChildren: () => import('./modules/pedidos/pedidos.module').then((p) => p.PedidosModule)},
  { path: "cardapio", loadChildren: () => import('./modules/cardapio/cardapio.module').then((c) => c.CardapioModule)},
  { path: "historico", loadChildren: () => import('./modules/historico/historico.module').then((h) => h.HistoricoModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
