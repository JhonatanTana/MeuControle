using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MeuControleAPI.Migrations
{
    /// <inheritdoc />
    public partial class updateFormaPagamento : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProdutosPedido_Pedido_PedidoId",
                table: "ProdutosPedido");

            migrationBuilder.DropForeignKey(
                name: "FK_ProdutosPedido_Produtos_ProdutoId",
                table: "ProdutosPedido");

            migrationBuilder.AlterColumn<int>(
                name: "ProdutoId",
                table: "ProdutosPedido",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "PedidoId",
                table: "ProdutosPedido",
                type: "int(5)",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int(5)",
                oldNullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Disponibilidade",
                table: "FormaPagamento",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddForeignKey(
                name: "FK_ProdutosPedido_Pedido_PedidoId",
                table: "ProdutosPedido",
                column: "PedidoId",
                principalTable: "Pedido",
                principalColumn: "PedidoId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProdutosPedido_Produtos_ProdutoId",
                table: "ProdutosPedido",
                column: "ProdutoId",
                principalTable: "Produtos",
                principalColumn: "ProdutoId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProdutosPedido_Pedido_PedidoId",
                table: "ProdutosPedido");

            migrationBuilder.DropForeignKey(
                name: "FK_ProdutosPedido_Produtos_ProdutoId",
                table: "ProdutosPedido");

            migrationBuilder.DropColumn(
                name: "Disponibilidade",
                table: "FormaPagamento");

            migrationBuilder.AlterColumn<int>(
                name: "ProdutoId",
                table: "ProdutosPedido",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "PedidoId",
                table: "ProdutosPedido",
                type: "int(5)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int(5)");

            migrationBuilder.AddForeignKey(
                name: "FK_ProdutosPedido_Pedido_PedidoId",
                table: "ProdutosPedido",
                column: "PedidoId",
                principalTable: "Pedido",
                principalColumn: "PedidoId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProdutosPedido_Produtos_ProdutoId",
                table: "ProdutosPedido",
                column: "ProdutoId",
                principalTable: "Produtos",
                principalColumn: "ProdutoId");
        }
    }
}
