using AutoMapper;
using MeuControleAPI.Models;

namespace MeuControleAPI.DTOs.Mapping; 
public class ProdutosPedidoDTOMappingProfile : Profile {

    public ProdutosPedidoDTOMappingProfile() {


        CreateMap<Pedido, PedidoDTO>().ReverseMap();
        CreateMap<ProdutosPedido, ProdutosPedidoDTO>().ReverseMap();
    }
}
