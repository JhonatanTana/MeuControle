using AutoMapper;
using MeuControleAPI.Models;

namespace MeuControleAPI.DTOs.Mapping; 
public class ProdutosPedidoDTOMappingProfile : Profile {

    public ProdutosPedidoDTOMappingProfile() {
        CreateMap<ProdutosPedido, ProdutosPedidoDTO>()
            .ForMember(dest => dest.Produtos, opt => opt.MapFrom(src => src.Produto))
            .ReverseMap();

        CreateMap<Produto, ProdutoDTO>().ReverseMap();
        CreateMap<Pedido, PedidoDTO>().ReverseMap();
    }
}
