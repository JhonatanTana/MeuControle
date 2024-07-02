using AutoMapper;
using Microsoft.AspNetCore.Http;
using System.IO;

namespace MeuControleAPI.DTOs.Mapping; 
public class ByteArrayToIFormFileConverter : ITypeConverter<byte[], IFormFile> {

    public IFormFile Convert(byte[] source, IFormFile destination, ResolutionContext context) {
        if (source == null) {
            return null;
        }

        var stream = new MemoryStream(source);
        return new FormFile(stream, 0, source.Length, null, "image.jpg");
    }
}
