using MeuControleAPI.Models;
using AutoMapper;

namespace MeuControleAPI.DTOs.Mapping; 
public class ProdutoDTOMappingProfile: Profile {
    public ProdutoDTOMappingProfile() {

        CreateMap<Produto, ProdutoDTO>().ReverseMap();
        CreateMap<Categoria, CategoriaDTO>().ReverseMap();
        CreateMap<Produto, ProdutoDTOUpdateRequest>().ReverseMap();
        CreateMap<Produto, ProdutoDTOUpdateResponse>().ReverseMap();

    }
}
