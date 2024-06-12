using AutoMapper;
using MeuControleAPI.Models;

namespace MeuControleAPI.DTOs.Mapping; 
public class PedidoDTOMappingProfile : Profile {

    public PedidoDTOMappingProfile() { 
        
        CreateMap<Pedido, PedidoDTO>().ReverseMap();
        CreateMap<ProdutosPedido, ProdutosPedidoDTO>().ReverseMap();
    }
}
