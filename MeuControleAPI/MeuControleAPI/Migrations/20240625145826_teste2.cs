using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MeuControleAPI.Migrations
{
    /// <inheritdoc />
    public partial class teste2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte[]>(
                name: "ImagemUrl",
                table: "Produtos",
                type: "longblob",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext")
                .OldAnnotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "ImagemUrl",
                table: "Produtos",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(byte[]),
                oldType: "varbinary(max)")
                .Annotation("MySql:CharSet", "utf8mb4");
        }
    }
}
