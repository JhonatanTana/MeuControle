using AutoMapper;
using MeuControleAPI.DTOs.Request;
using MeuControleAPI.Models;

namespace MeuControleAPI.DTOs.Mapping;
public class PedidoDTOMappingProfile : Profile {

    public PedidoDTOMappingProfile() {

        CreateMap<Pedido, PedidoDTO>().ReverseMap();
        CreateMap<ProdutosPedido, ProdutosPedidoDTO>().ReverseMap();
        CreateMap<FormaPagamento, FormaPagamentoDTO>().ReverseMap();
        CreateMap<Pedido, PedidoDTOUpdateResquest>().ReverseMap();
    }
}
