using AutoMapper;
using MeuControleAPI.Models;

namespace MeuControleAPI.DTOs.Mapping; 
public class CategoriaDTOMappingProfile : Profile {
    public CategoriaDTOMappingProfile() {

        CreateMap<Produto, ProdutoDTO>().ReverseMap();
        CreateMap<Categoria, CategoriaDTO>().ReverseMap();
        CreateMap<Categoria, CategoriaDTOUpdateRequest>().ReverseMap();
        CreateMap<Categoria, CategoriaDTOUpdateResponse>().ReverseMap();

    }
}
