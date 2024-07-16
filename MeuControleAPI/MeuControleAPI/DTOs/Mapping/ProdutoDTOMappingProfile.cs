using AutoMapper;
using MeuControleAPI.Models;

namespace MeuControleAPI.DTOs.Mapping;
public class ProdutoDTOMappingProfile : Profile {
    public ProdutoDTOMappingProfile() {

        CreateMap<Produto, ProdutoDTO>()
           .ForMember(dest => dest.ImagemUrl, opt => opt.MapFrom(src => src.ImagemUrl));

        CreateMap<ProdutoDTO, Produto>()
            .ForMember(dest => dest.ImagemUrl, opt => opt.MapFrom(src => src.ImagemUrl));
    }
}

