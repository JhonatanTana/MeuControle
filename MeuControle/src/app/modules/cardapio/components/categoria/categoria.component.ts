import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { CategoriaService } from "../../../../services/categoria/categoria.service";
import { Router } from "@angular/router";
import { CategoriaRequest } from "../../../../models/interface/categoria/categoria-request";
import { MessageService } from "primeng/api";
import { CategoriaEvent } from "../../../../models/enums/categoria-event";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { Subject, takeUntil } from "rxjs";
import { EventAction } from "../../../../models/interface/event/event-action";
import { CategoriaResponse } from "../../../../models/interface/categoria/categoria-response";
import { EditCategoriaRequest } from "../../../../models/interface/categoria/edit-categoria-request";
import { CategoriaDataTransferService } from "../../../../shared/services/categoria/categoria-data-transfer.service";


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent implements OnInit, OnDestroy{
  private readonly destroy$:Subject<void> = new Subject()
  public categoriaList: Array<CategoriaResponse> = [];
  public categoriaAction!: {
    event: EventAction,
    categoriasData: Array<CategoriaResponse>
  }

  public categoriaSelecionadoData!: CategoriaResponse;

  public cadastrarCategoriaAction = CategoriaEvent.ADD_CATEGORIA_EVENT
  public editCategoriaAction = CategoriaEvent.EDIT_CATEGORIA_EVENT

  categoriaForm = this.formBuilder.group({
    Nome: ['', [Validators.required]],
    Disponibilidade: [false],
  })
  editCategoriaForm = this.formBuilder.group({
    Nome: ['', [Validators.required]],
    Disponibilidade: [false],
  })

  constructor(
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService,
    private categoriaDTService: CategoriaDataTransferService,
    private route: Router,
    private messageService: MessageService,
    public ref: DynamicDialogConfig,
    public dialogRef: DynamicDialogRef,
  ) { }

  ngOnInit(): void {
    this.categoriaAction = this.ref.data
    console.log(this.categoriaAction)

    if (this.categoriaAction?.event?.action === this.editCategoriaAction && this.categoriaAction?.categoriasData) {
      console.log(this.categoriaAction.categoriasData)
      this.getCategoriaSelecionado(this.categoriaAction.event.id as number)
    }
    this.categoriaAction?.event?.action === this.editCategoriaAction && this.getCategoriaData()

  }

  handleSubmitAddCategoria() {
    if (this.categoriaForm?.valid && this.categoriaForm.value) {
      const requestCategoria: CategoriaRequest = {
        Nome: this.categoriaForm.value.Nome as string,
        Disponibilidade:this.categoriaForm.value.Disponibilidade as boolean,
      }
      this.categoriaService.cadastrarCategoria(requestCategoria).pipe(takeUntil(this.destroy$)).subscribe({
        next: (response) => {
          if (response) {
          }
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Categoria cadastrada com sucesso',
            life: 2000
          })
          this.dialogRef.close()
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: "Erro ao ao cadastrar a categoria",
            life: 2000
          })
        }
      })
    }
  }
  handleSubmitEditCategoria() {
    if (this.editCategoriaForm?.valid && this.editCategoriaForm.value && this.categoriaAction.event.id) {
      const categoriaEditada: EditCategoriaRequest = {
        Disponibilidade: this.editCategoriaForm.value.Disponibilidade as boolean,
        CategoriaId: this.categoriaAction?.event?.id as number,
        Nome: this.editCategoriaForm.value.Nome as string
      }
      this.categoriaService.editarCategoria(categoriaEditada).pipe(takeUntil(this.destroy$)).subscribe({
        next:() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Categoria editada com sucesso',
            life: 2000
          })
          this.dialogRef.close()
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: "Erro ao editar categoria",
            life: 2000
          })
        }
      })
    }
  } //edita um produto
  getCategoriaSelecionado(id:number): void {
    const categorias = this.categoriaAction?.categoriasData

    if (categorias?.length > 0) {
      const filtro = categorias.filter((element) => element.categoriaId === id)

      if (filtro) {
        this.categoriaSelecionadoData = filtro[0]
        this.editCategoriaForm.setValue({
          Nome: this.categoriaSelecionadoData?.nome as string,
          Disponibilidade: this.categoriaSelecionadoData?.disponibilidade as boolean,
        })
      }
    }
  } //passa as informações de um produto
  getCategoriaData(): void{
    this.categoriaService.getCategorias().pipe(takeUntil(this.destroy$)).subscribe({
      next:(response) => {
        if (response.length > 0) {
          this.categoriaList = response
          this.categoriaList && this.categoriaDTService.setCategoriaData(this.categoriaList)
        }
      }
    })
  } //pegas as informações dos produtos

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
