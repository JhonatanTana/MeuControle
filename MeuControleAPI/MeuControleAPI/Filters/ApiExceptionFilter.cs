using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace MeuControleAPI.Filters;
public class ApiExceptionFilter {

    public void OnException(ExceptionContext context) {

        context.Result = new ObjectResult("Ocorreu um problema ao tratar a sua solicitação: Status Code 500") {

            StatusCode = StatusCodes.Status500InternalServerError,

        };
    }
}
