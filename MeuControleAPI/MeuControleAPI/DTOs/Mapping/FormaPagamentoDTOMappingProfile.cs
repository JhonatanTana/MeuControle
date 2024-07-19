using AutoMapper;
using MeuControleAPI.DTOs.Request;
using MeuControleAPI.Models;

namespace MeuControleAPI.DTOs.Mapping;
public class FormaPagamentoDTOMappingProfile : Profile {

    public FormaPagamentoDTOMappingProfile() {

        CreateMap<FormaPagamento,PagamentoDTOUpdateRequest>().ReverseMap();
        CreateMap<FormaPagamento, FormaPagamentoDTO>().ReverseMap();
        CreateMap<Pedido, PedidoDTO>().ReverseMap();
    }
}
