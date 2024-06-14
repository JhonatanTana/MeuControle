using AutoMapper;
using MeuControleAPI.Models;

namespace MeuControleAPI.DTOs.Mapping;
public class FormaPagamentoDTOMappingProfile : Profile {

    public FormaPagamentoDTOMappingProfile() {

        CreateMap<FormaPagamento, FormaPagamentoDTO>().ReverseMap();
        CreateMap<Pedido, PedidoDTO>().ReverseMap();
    }
}
