import { Component } from '@angular/core';
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { Subject } from "rxjs";
import { UsuarioResponse } from "../../../../models/interface/usuario/usuario-response";

@Component({
  selector: 'app-config-page',
  templateUrl: './config-page.component.html',
  styleUrl: './config-page.component.scss'
})
export class ConfigPageComponent {
  private readonly destroy$:Subject<void> = new Subject()
  private ref!: DynamicDialogRef
  public usuarioList: Array<UsuarioResponse> = []

  constructor(

  ) { }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
