using AutoMapper;
using MeuControleAPI.DTOs.Request;
using MeuControleAPI.DTOs.Resposta;
using MeuControleAPI.Models;

namespace MeuControleAPI.DTOs.Mapping;
public class ProdutoDTOMappingProfile : Profile {
    public ProdutoDTOMappingProfile() {

        CreateMap<Produto, ProdutoDTO>()
           .ForMember(dest => dest.ImagemUrl, opt => opt.MapFrom(src => src.ImagemUrl));

        CreateMap<ProdutoDTO, Produto>()
            .ForMember(dest => dest.ImagemUrl, opt => opt.MapFrom(src => src.ImagemUrl));
        CreateMap<Produto, ProdutoDTOUpdateRequest>().ReverseMap();
        CreateMap<Produto, ProdutoDTOUpdateResponse>().ReverseMap();
    }
}

