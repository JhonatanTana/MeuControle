export interface CategoriaProdutos {

  categoriaId: number
  nome: string
  disponibilidade: boolean
  produtos: {
    produtoId: number
    nome: string
    preco: number
    disponibilidade: boolean
  }
}
