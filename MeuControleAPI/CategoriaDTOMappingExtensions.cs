﻿using MeuControleAPI.Models;

namespace MeuControleAPI.DTOs.Mapping;
public static class CategoriaDTOMappingExtensions {

    public static CategoriaDTO? ToCategoriaDTO(this Categoria categoria) {

        if (categoria is null) {

            return null;
        }

        return new CategoriaDTO {

            CategoriaId = categoria.CategoriaId,
            Nome = categoria.Nome,
            Disponibilidade = categoria.Disponibilidade,

        };
    }

    public static Categoria? ToCategoria(this CategoriaDTO categoriaDto) {

        if (categoriaDto is null) {
            return null;
        }

        return new Categoria {

            CategoriaId = categoriaDto.CategoriaId,
            Nome = categoriaDto.Nome,
            Disponibilidade = categoriaDto.Disponibilidade,
        };
    }

    public static IEnumerable<CategoriaDTO> ToCategoriaDTOList(this IEnumerable<Categoria> categorias) {

        if (categorias is null || !categorias.Any()) {

            return new List<CategoriaDTO>();
        }

        return categorias.Select(categoria => new CategoriaDTO {

            CategoriaId = categoria.CategoriaId,
            Nome = categoria.Nome,
            Disponibilidade = categoria.Disponibilidade,
        }).ToList();
    }
}


