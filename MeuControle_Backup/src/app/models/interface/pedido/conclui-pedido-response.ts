export interface ConcluiPedidoResponse {
  pedidoId: number,
  nome: string,
  mesa: number,
  data: string,
  valorTotal: number,
  disponibilidade: boolean,
  formaPagamento: string
}
