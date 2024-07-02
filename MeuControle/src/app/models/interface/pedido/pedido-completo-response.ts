export interface PedidoCompletoResponse {
  pedidoId: number,
  nome: string,
  mesa: number,
  data: string,
  valorTotal: number,
  disponibilidade: boolean,
  formaPagamento: {
    pagamentoId: number,
    nome: string,
    disponibilidade: boolean
  },
  produtosPedido: {
    produtosPedidoId: number,
    quantidade: number,
    precoTotal: number,
    produtoId: number,
    pedidoId: number,
    produto: {
      produtoId: number,
      nome: string,
      preco: number,
      disponibilidade: boolean,
      categoriaId: number
    }
  }
}
