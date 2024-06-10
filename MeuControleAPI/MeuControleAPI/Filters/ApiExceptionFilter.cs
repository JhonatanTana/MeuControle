using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;

namespace MeuControleAPI.Filters {
    public class ApiExceptionFilter {

        public void OnException(ExceptionContext context) {

            context.Result = new ObjectResult("Ocorreu um problema ao tratar a sua solicitação: Status Code 500") {

                StatusCode = StatusCodes.Status500InternalServerError,

            };
        }
    }
}
